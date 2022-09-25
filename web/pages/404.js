import {useTheme} from '@emotion/react'
import {Container, Fade, Stack, Typography, useMediaQuery} from '@mui/material'
import {Box} from '@mui/system'
import NavItem from 'components/NavItem'
import {NextSeo} from 'next-seo'
import Image from 'next/image'
import Cta from 'components/Cta'
import Header from 'components/Header'

export default function _404(props) {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const {config, navigation} = props

  if (!config || !navigation) return null

  const {title, logos} = config
  const {mainNavigation = [], navigationCTAs = []} = navigation

  return (
    <>
      <NextSeo title={`${config.title} | Page not found`} noindex />

      <Header
        transparent={false}
        navItems={mainNavigation}
        ctas={navigationCTAs}
        title={title}
        logos={logos}
      />

      <Fade in timeout={1000}>
        <Container
          maxWidth={'lg'}
          sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh'}}
        >
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant="h1" align="center" sx={{mt: 6}}>
              <b>404</b>
            </Typography>
            <Typography variant="h6" align="center" sx={{mb: 2}}>
              We couldn&apos;t find that page
            </Typography>

            <Typography variant="caption" align="center">
              Maybe one of these might help.
            </Typography>
          </Box>

          <Box sx={{display: 'flex', gap: 2, my: 2, alignItems: 'center'}}>
            <Stack direction="row" gap={2}>
              {mainNavigation.map((item) => (
                <NavItem key={item._key} navItem={item} darkText />
              ))}
            </Stack>
          </Box>

          <Stack sx={{my: 2, alignItems: 'center'}}>
            {navigationCTAs &&
              navigationCTAs.map((cta) => <Cta {...cta} key={cta._key} sx={{mr: 1}} />)}
          </Stack>
        </Container>
      </Fade>
    </>
  )
}
