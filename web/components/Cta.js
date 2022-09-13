import {Button} from '@mui/material'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'
import fireGtag from '../utils/fireGtag'
import Link from './CustomLink.js'
function Cta(props) {
  const {title, route, link, isPrimary, color = null, ...others} = props
  const {asPath} = useRouter()

  const handleClick = () => {
    fireGtag('cta_click', {label: `${title}`, category: `page_${asPath}`})
  }

  if (route && route.slug && route.slug.current) {
    if (isPrimary) {
      return (
        <Button
          LinkComponent={Link}
          href={`/${route.slug.current}`}
          color="secondary"
          onClick={handleClick}
          {...others}
        >
          {title}
        </Button>
      )
    }
    return (
      <Button
        LinkComponent={Link}
        href={`/${route.slug.current}`}
        color="primary"
        onClick={handleClick}
        {...others}
      >
        {title}
      </Button>
    )
  }

  // For External Links
  if (link) {
    if (isPrimary) {
      return (
        <Button
          LinkComponent={Link}
          href={link}
          color="secondary"
          target="_blank"
          rel="noOpener"
          onClick={handleClick}
          {...others}
        >
          {title}
        </Button>
      )
    }
    return (
      <Button
        LinkComponent={Link}
        sx={{transition: 'all 0s'}}
        href={link}
        variant="outlined"
        color={'primary'}
        target="_blank"
        rel="noOpener"
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
