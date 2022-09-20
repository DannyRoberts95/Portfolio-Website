import {Button} from '@mui/material'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'
import fireGtag from '../utils/fireGtag'
import Link from './CustomLink.js'
function Cta(props) {
  const buildLinkSrc = (navLink) => {
    if (!navLink) return '#'

    const {linkType} = navLink
    switch (linkType) {
      case 'external':
        return navLink.url
      case 'path':
        return navLink.path
      case 'internal':
        return navLink?.slug?.current
      default:
        return '#'
    }
  }

  const {title, route, navLink, isPrimary, color = null, ...others} = props

  if (!navLink) {
    return null
  }

  const handleClick = () => {
    // fireGtag('cta_click', {label: `${title}`, category: `page_${asPath}`})
    console.log('add gtag event in CTA')
  }

  if (navLink) {
    const externalProps = {rel: 'noOpener', target: '_blank'}

    return (
      <Button
        LinkComponent={Link}
        href={buildLinkSrc(navLink)}
        variant={isPrimary ? 'contained' : 'outlined'}
        color={isPrimary ? 'secondary' : 'primary'}
        onClick={handleClick}
        {...(navLink.linkType === 'external' && externalProps)}
        {...others}
      >
        {title || navLink.title}
      </Button>
    )
  }

  return null
}

Cta.propTypes = {
  route: PropTypes.shape({
    slug: PropTypes.shape({
      current: PropTypes.string,
    }),
  }),
  link: PropTypes.string,
}

export default Cta
