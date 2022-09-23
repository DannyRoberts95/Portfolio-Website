import Head from 'next/head'
import PropTypes from 'prop-types'

import {Box, Fade, Grow} from '@mui/material'
import {LogoJsonLd} from 'next-seo'
import CookieBanner from '../CookieBanner'
import Footer from '../Footer'
import Header from '../Header'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import techtext from 'utils/helpers/techText'

function Layout(props) {
  const router = useRouter()
  const {
    config,
    navigation: {mainNavigation, footerNavigation, footerText, navigationCTAs = []},
    children,
  } = props

  const [transitioning, setTransitioning] = useState(false)

  const fuckWithDocumentTitle = () => {
    let fucks = 0
    let inc = 150
    if (typeof document === undefined) return null
    const chars = ['@', '!', '3', '&', '•', '*', '#', 'D', 'H', 'R', '{', '}']
    const correctTitle = document.title

    const fuckTitle = () => {
      fucks++
      if (fucks < 7) {
        document.title = [...document.title]
          .map((char) => chars[Math.floor(Math.random() * chars.length)])
          .join('')
        setTimeout(() => fuckTitle(), Math.random() * fucks * inc)
      } else {
        document.title = techtext(correctTitle)
      }
    }

    fuckTitle()
  }

  const handleRouteChangeStart = () => {
    setTransitioning(true)
  }
  const handleRouteChangeComplete = (url, {shallow}) => {
    fuckWithDocumentTitle()
    setTransitioning(false)
  }

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [])

  if (!config) {
    console.error('Missing config')
    return <div>Missing config</div>
  }

  const {title, transparentHeader, logos, url, disableCookieBanner} = config

  const logoUrl = logos && logos.primary && logos.primary.url

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width, viewport-fit=cover" />
      </Head>
      <Box id="page_container" className="container">
        <Header
          transparent={transparentHeader}
          navItems={mainNavigation}
          ctas={navigationCTAs}
          title={title}
          logos={logos}
        />

        <Fade in={!transitioning} timeout={500}>
          <Box className="content">{children}</Box>
        </Fade>

        <Footer logos={logos} title={title} footerNavigation={footerNavigation} text={footerText} />

        {!disableCookieBanner && <CookieBanner />}
        {logoUrl && url && <LogoJsonLd url={url} logo={logoUrl} />}
      </Box>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  config: PropTypes.shape({
    title: PropTypes.string,
    mainNavigation: PropTypes.object,
    footerNavigation: PropTypes.object,
    footerText: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
      asset: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
    url: PropTypes.string,
  }),
  navigation: PropTypes.shape({
    mainNavigation: PropTypes.array,
    footerNavigation: PropTypes.array,
  }),
}

export default Layout
