import {useTheme} from '@emotion/react'
import {Container, Fade, Stack, Typography, useMediaQuery} from '@mui/material'
import {Box} from '@mui/system'
import NavItem from 'components/NavItem'
import {NextSeo} from 'next-seo'
import Cta from 'components/Cta'
import Header from 'components/Header'

export default function _Error(props) {
  const theme = useTheme()

  const {config, navigation} = props

  if (!config || !navigation) return null

  const {title, logos} = config
  const {mainNavigation = [], navigationCTAs = []} = navigation

  return (
    <>
      <NextSeo title={'there was a problem'} noindex />

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
          <Typography variant="h5" align="center" gutterBottom>
            <b>There was a problem on our end.</b>
          </Typography>
          <Typography variant="h6" align="center" sx={{mb: 4}}>
            Try refreshing the page or trying one of the links below.
          </Typography>

          <Typography variant="caption" align="center">
            Maybe one of these might help.
          </Typography>

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
