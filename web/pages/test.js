import {useTheme} from '@emotion/react'
import {Button, Container, Fade, Stack, Typography, useMediaQuery} from '@mui/material'
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
          <Stack gap={1}>
            <Box flex>
              <Button variant="text" color="primary">
                text primary
              </Button>
              <Box p={2} bgcolor="black">
                <Button variant="text" color="secondary">
                  text secondary
                </Button>
              </Box>
            </Box>

            <Box flex>
              <Button variant="outlined" color="primary">
                outlined primary
              </Button>

              <Box p={2} bgcolor="black">
                <Button variant="outlined" color="secondary">
                  outlined secondary
                </Button>
              </Box>
            </Box>

            <Box flex>
              <Button variant="contained" color="primary" sx={{mb: 2}}>
                Contained Primary
              </Button>
              <Box p={2} bgcolor="black">
                <Button variant="contained" color="secondary">
                  Contained Secondary
                </Button>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Fade>
    </>
  )
}
