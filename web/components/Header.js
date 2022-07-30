import {useTheme} from '@emotion/react'
import {Clear, Menu} from '@mui/icons-material'
import {
  AppBar,
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  SwipeableDrawer,
  Toolbar,
  useScrollTrigger,
} from '@mui/material'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'
import Cta from './Cta'
import Logo from './Logo'
import NavItem from './NavItem'

const AppHeader = (props) => {
  const theme = useTheme()
  const router = useRouter()

  const {title, logos, ctas, navItems = [], transparent} = props

  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })

  //trigger the menu color change on scroll OR just color it from the get go if the page has no hero banner
  const trigger = !transparent || scrollTrigger

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const headerColor = trigger ? theme.palette.background.paper : 'transparent'
  const textColor = trigger ? theme.palette.text.secondary : '#fff'

  const handleOpenMenu = () => {
    setMobileMenuOpen(true)
  }
  const handleCloseMenu = () => {
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    router.events.on('routeChangeStart', handleCloseMenu)
    return () => {
      router.events.off('routeChangeStart', handleCloseMenu)
    }
  }, [])

  const navbar = (
    <>
      <AppBar
        position="fixed"
        sx={{
          transition: 'all 0.25s',
          color: textColor,
          backgroundColor: headerColor,
          minHeight: theme.shape.headerHeight,
          display: 'flex',
          justifyContent: 'center',
        }}
        elevation={trigger ? 4 : 0}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Logo logo={logos[trigger ? 'primary' : 'contrast']} alt={title} />

              <Box sx={{display: {xs: 'none', md: 'flex'}, gap: 2.5, my: 1, alignItems: 'center'}}>
                {navItems.map((item) => (
                  <NavItem key={item._key} navItem={item} darkText={trigger} />
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
                  <Menu />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {!transparent && <Toolbar />}
    </>
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
              <Clear />
            </IconButton>
          </Stack>

          <Divider />

          <Stack gap={2}>
            {navItems.map((item) => (
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
            {ctas &&
              ctas.map((cta) => (
                <Cta {...cta} key={cta._key} sx={{mr: 1}} variant="outlined" fullWidth />
              ))}
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
