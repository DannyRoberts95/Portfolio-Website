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
          <Box flex>
            <Button variant="text" color="primary">
              text primary
            </Button>
            <Button variant="text" color="secondary">
              text secondary
            </Button>
          </Box>
          <Box flex>
            <Button variant="outlined" colored="primary">
              outlined primary
            </Button>
            <Button variant="outlined" colored="primary">
              outlined primary
            </Button>
          </Box>
          <Box flex>
            <Button variant="outlined" colored="primary">
              outlined Secondary
            </Button>
            <Button variant="outlined" colored="secondary">
              outlined Secondary
            </Button>
          </Box>
        </Container>
      </Fade>
    </>
  )
}
