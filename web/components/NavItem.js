import {useTheme} from '@emotion/react'
import {Add} from '@mui/icons-material'
import {Box, Stack, Typography, useMediaQuery} from '@mui/material'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'
import {useRef, useState} from 'react'
import isServer from '../utils/isServer'
import {slugParamToPath} from '../utils/urls'
import Link from './CustomLink'
import DropdownMenu from './DropdownMenu'

const TypographyLink = (props) => {
  return <Typography component={Link} underline="none" variant="caption" {...props} />
}

// Component to handle internal routing
const InternalLink = ({navItem, darkText, sx, ...others}) => {
  const router = useRouter()
  const theme = useTheme()

  const {slug, page} = navItem

  if (!slug || !page) {
    return null
  }

  const isActiveSlug = (slug) => {
    if (isServer) return false
    return slugParamToPath(router?.query?.slug) === slug
  }
  const textColor = darkText ? theme.palette.text.secondary : '#fff'

  const href = slug.current === '/' ? slug.current : `/${slug.current}`

  return (
    <TypographyLink
      href={href}
      sx={[
        {
          color: textColor,
          display: 'block',
          textTransform: 'capitalize',
          opacity: 0.8,
          '&:hover': {opacity: 1},
        },
        isActiveSlug(slug.current) && {
          color: darkText ? theme.palette.primary.main : '#fff',
          fontStyle: 'italic',
          fontWeight: (theme) => theme.typography.fontWeightBold,
        },
        Boolean(sx) && {...sx},
      ]}
      {...others}
    >
      {page}
    </TypographyLink>
  )
}

// Component to handle external routing
const ExternalLink = ({navItem, darkText, sx, ...others}) => {
  const theme = useTheme()
  if (!navItem) return null
  const textColor = darkText ? theme.palette.text.secondary : '#fff'

  const {title, url} = navItem
  if (!title || !url) return null

  return (
    <TypographyLink
      sx={[
        {
          color: textColor,
          display: 'block',
          textTransform: 'capitalize',
          opacity: 0.8,
          '&:hover': {opacity: 1},
        },
        Boolean(sx) && {...sx},
      ]}
      href={url}
      target="_blank"
      rel="noopener"
      {...others}
    >
      {title}
    </TypographyLink>
  )
}

// Component to handle external routing
const PathLink = ({navItem, darkText, sx, ...others}) => {
  const router = useRouter()
  const theme = useTheme()
  if (!navItem) return null
  const textColor = darkText ? theme.palette.text.secondary : '#fff'

  const isActiveSlug = (slug) => {
    if (isServer) return false
    return slugParamToPath(router?.pathname).includes(slug)
  }

  const {path, title} = navItem
  if (!title || !path) return null

  return (
    <TypographyLink
      sx={[
        {
          color: textColor,
          display: 'block',
          textTransform: 'capitalize',
          opacity: 0.8,
          '&:hover': {opacity: 1},
          ...sx,
        },
        isActiveSlug(path.toLowerCase()) && {
          color: darkText ? theme.palette.primary.main : '#fff',
          fontStyle: 'italic',
          fontWeight: (theme) => theme.typography.fontWeightBold,
        },
        Boolean(sx) && {...sx},
      ]}
      href={path.toLowerCase()}
      {...others}
    >
      {title}
    </TypographyLink>
  )
}

// Component to dropdown menus of internal links and external ones
const NavDropdownMenu = ({navItem, darkText, ...others}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const anchorRef = useRef(null)
  const theme = useTheme()

  const textColor = darkText ? theme.palette.text.secondary : '#fff'

  if (!navItem) return null
  const {baseLink, childLinks} = navItem

  const handleHover = () => {
    setMenuOpen(true)
  }

  const handleClose = () => {
    setMenuOpen(false)
  }

  return (
    <Box component={'span'} onMouseEnter={handleHover}>
      <Stack ref={anchorRef} direction="row" alignItems={'center'}>
        <NavItem navItem={baseLink} darkText={darkText} {...others} />
        <Add
          fontSize="small"
          htmlColor={textColor}
          sx={{
            opacity: 0.5,
            transition: 'transform 0.25s',
            transform: menuOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        />
      </Stack>

      <DropdownMenu
        anchorElement={anchorRef}
        open={menuOpen}
        handleClose={handleClose}
        sx={{my: 1}}
      >
        <Stack m={1} gap={0.5}>
          {childLinks.map((navItem) => (
            <NavItem key={navItem._key} navItem={navItem} darkText onClick={handleClose} />
          ))}
        </Stack>
      </DropdownMenu>
    </Box>
  )
}

// Component to dropdown menus of internal links and external ones
const NavDropdownMenuMobile = ({navItem, darkText, ...others}) => {
  if (!navItem) return null
  const {baseLink, childLinks} = navItem

  return (
    <Box component={'span'}>
      <NavItem navItem={baseLink} darkText {...others} />
      <Stack p={1} gap={1}>
        {childLinks.map((navItem) => (
          <NavItem key={navItem._key} navItem={navItem} darkText sx={{color: 'text.disabled'}} />
        ))}
      </Stack>
    </Box>
  )
}

export default function NavItem(props) {
  const {navItem} = props
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.down('md'))
  if (!navItem) return null

  // check the tpye of nav item and render the correct component
  switch (navItem.itemType) {
    case 'internal':
      return <InternalLink {...props} />
    case 'external':
      return <ExternalLink {...props} />
    case 'path':
      return <PathLink {...props} />
    case 'navLinkDropdown':
      return isMd ? <NavDropdownMenuMobile {...props} /> : <NavDropdownMenu {...props} />
    default:
      return null
  }
}

NavItem.propTypes = {
  navItem: PropTypes.object,
}
