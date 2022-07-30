import Head from 'next/head'
import PropTypes from 'prop-types'

import {Box} from '@mui/material'
import {LogoJsonLd} from 'next-seo'
import CookieBanner from '../CookieBanner'
import Footer from '../Footer'
import Header from '../Header'

function Layout(props) {
  const {
    config,
    navigation: {mainNavigation, footerNavigation, footerText, navigationCTAs = []},
    children,
  } = props

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

        <Box className="content">{children}</Box>

        <Footer logos={logos} title={title} navItems={footerNavigation} text={footerText} />

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
