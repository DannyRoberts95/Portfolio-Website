import {useTheme} from '@emotion/react'

import {UilBars, UilTimes} from '@iconscout/react-unicons'
import {
  AppBar,
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  SwipeableDrawer,
  Toolbar,
} from '@mui/material'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'
import {useEffect, useRef, useState} from 'react'
import Cta from './Cta'
import Logo from './Logo'
import NavItem from './NavItem'

const AppHeader = (props) => {
  const theme = useTheme()
  const router = useRouter()

  const {title, logos, ctas, navItems = [], transparent} = props

  // const scrollTrigger = useScrollTrigger({
  //   disableHysteresis: true,
  //   threshold: 0,
  // })

  //trigger the menu color change on scroll OR just color it from the get go if the page has no hero banner
  // const trigger = !transparent || scrollTrigger

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const headerColor = theme.palette.background.paper
  const textColor = theme.palette.text.secondary

  const handleOpenMenu = () => {
    setMobileMenuOpen(true)
  }
  const handleCloseMenu = () => {
    setMobileMenuOpen(false)
  }

  const appBar = useRef()
  const computeToolbarHeight = () => {
    if (appBar?.current) {
      return appBar.current.clientHeight
    }
    return theme.shape.headerHeight
  }

  useEffect(() => {
    router.events.on('routeChangeStart', handleCloseMenu)
    return () => {
      router.events.off('routeChangeStart', handleCloseMenu)
    }
  }, [])

  const navbar = (
    <Box component={'span'}>
      <AppBar
        ref={appBar}
        position="fixed"
        elevation={0}
        sx={{
          transition: 'all 0.25s',
          color: textColor,
          backgroundColor: headerColor,
          borderBottom: `2px solid ${theme.palette.primary.main}`,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: (theme) => theme.shape.headerHeight,
              }}
            >
              <Logo logo={logos['primary']} alt={title} size={45} />

              <Box sx={{display: {xs: 'none', md: 'flex'}, gap: 2.5, my: 1, alignItems: 'center'}}>
                {navItems.map((item) => (
                  <NavItem key={item._key} navItem={item} darkText />
                ))}
                {ctas && ctas.map((cta) => <Cta {...cta} key={cta._key} />)}
              </Box>

              {/* MOBILE */}
              <Box
                sx={{display: {xs: 'flex', md: 'none'}, flexGrow: 1, justifyContent: 'flex-end'}}
              >
                <IconButton
                  sx={{p: 0}}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenMenu}
                  color="inherit"
                  aria-details="the_menu_button_to_open_the_mobile_site_naviagtion"
                >
                  <UilBars />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar sx={{minHeight: computeToolbarHeight(), height: computeToolbarHeight()}} />
    </Box>
  )

  const drawer = (
    <SwipeableDrawer
      anchor={'left'}
      variant="temporary"
      open={mobileMenuOpen}
      onBackdropClick={handleCloseMenu}
      onClose={handleCloseMenu}
      onOpen={handleCloseMenu}
      sx={{display: {md: 'none'}}}
      PaperProps={{sx: {width: '100vw'}}}
    >
      <Container sx={{height: '100vh', p: 2}}>
        <Box sx={{positon: 'relative', display: 'flex', gap: 1.5, flexDirection: 'column'}}>
          <Stack direction={'row'} justifyContent="space-between" alignItems={'flex-start'}>
            <Logo logo={logos['primary']} width={125} />
            <IconButton size="small" onClick={handleCloseMenu}>
              <UilTimes />
            </IconButton>
          </Stack>

          <Divider />

          <Stack gap={2}>
            {navItems.map((item, i) => (
              <NavItem
                key={item._key}
                navItem={item}
                darkText
                sx={{fontSize: '1.65rem !important'}}
              />
            ))}
          </Stack>

          <Divider />

          <Box sx={{justifySelf: 'flex-end'}}>
            {ctas && ctas.map((cta) => <Cta {...cta} key={cta._key} />)}
          </Box>
        </Box>
      </Container>
    </SwipeableDrawer>
  )

  return (
    <>
      {navbar}
      {drawer}
    </>
  )
}

AppHeader.propTypes = {
  title: PropTypes.string,
  navItems: PropTypes.array,
  logos: PropTypes.object,
}

export default AppHeader
