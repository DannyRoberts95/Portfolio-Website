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
      default:
        return '#'
        break
    }
  }

  const {title, route, link, navLink, isPrimary, color = null, ...others} = props
  const {asPath} = useRouter()

  if (!navLink) {
    console.log(`${title}: Remove old CTA structure`)
    return null
  }
  console.log(title, props)
  console.log(buildLinkSrc(navLink))

  const handleClick = () => {
    fireGtag('cta_click', {label: `${title}`, category: `page_${asPath}`})
  }

  if (navLink) {
    return (
      <Button
        LinkComponent={Link}
        href={buildLinkSrc(navLink)}
        variant={isPrimary ? 'contained' : 'outlined'}
        color={isPrimary ? 'secondary' : 'primary'}
        onClick={handleClick}
        {...others}
      >
        {title}
      </Button>
    )
  }

  return null
}

Cta.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.shape({
    slug: PropTypes.shape({
      current: PropTypes.string,
    }),
  }),
  link: PropTypes.string,
}

export default Cta
