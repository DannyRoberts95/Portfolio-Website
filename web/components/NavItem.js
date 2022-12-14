import {useTheme} from '@emotion/react'
import {Typography, useMediaQuery} from '@mui/material'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'
import techtext from 'utils/helpers/techText'
import isServer from '../utils/isServer'
import {slugParamToPath} from '../utils/urls'
import Link from './CustomLink'

const TypographyLink = (props) => {
  return (
    <Typography component={Link} underline="none" variant="body2" fontWeight={500} {...props} />
  )
}

// Component to handle internal routing
const InternalLink = (props) => {
  const {navItem, darkText, sx, ...others} = props
  const router = useRouter()
  const theme = useTheme()

  const {slug} = navItem

  if (!slug) {
    return null
  }

  const isActiveSlug = (slug) => {
    if (isServer) return false
    return slugParamToPath(router?.query?.slug) === slug
  }

  const textColor = theme.palette.text.secondary
  const href = slug.current === '/' ? slug.current : `/${slug.current}`

  return (
    <TypographyLink
      href={href}
      sx={[
        {
          color: textColor,
          display: 'block',
          textTransform: 'uppercase',
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
      {isActiveSlug(slug.current) ? techtext(slug.current) : slug.current}
    </TypographyLink>
  )
}

// Component to handle external routing
const ExternalLink = (props) => {
  const {navItem, darkText, sx, ...others} = props
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
          textTransform: 'uppercase',
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
const PathLink = (props) => {
  const {navItem, darkText, sx, ...others} = props
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
          textTransform: 'uppercase',
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
      {isActiveSlug(path.toLowerCase()) ? techtext(title) : title}
    </TypographyLink>
  )
}

export default function NavItem(props) {
  const {navItem} = props
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.down('md'))

  if (!navItem) {
    return null
  }

  // check the tpye of nav item and render the correct component
  switch (navItem.linkType) {
    case 'internal':
      return <InternalLink {...props} />
    case 'external':
      return <ExternalLink {...props} />
    case 'path':
      return <PathLink {...props} />
    default:
      return null
  }
}

NavItem.propTypes = {
  navItem: PropTypes.object,
}
