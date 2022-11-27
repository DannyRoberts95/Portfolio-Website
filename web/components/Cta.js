import {Button} from '@mui/material'
import PropTypes from 'prop-types'
import Link from './CustomLink.js'

const buildLinkSrc = (navLink) => {
  const {itemType} = navLink
  console.log(navLink)
  switch (itemType) {
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
function Cta(props) {
  const {title, route, navLink, isPrimary, color = null, ...others} = props

  if (!navLink) {
    return null
  }

  const handleClick = () => {
    // fireGtag('cta_click', {label: `${title}`, category: `page_${asPath}`})
  }

  if (navLink) {
    const externalProps = {rel: 'noOpener', target: '_blank'}

    return (
      <Button
        LinkComponent={Link}
        href={buildLinkSrc(navLink)}
        variant={isPrimary ? 'contained' : 'outlined'}
        color={'primary'}
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
