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
          sx={{boxShadow: (theme) => theme.shadows[3]}}
          href={`/${route.slug.current}`}
          variant="contained"
          color={color || 'secondary'}
          size="large"
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
        // sx={{boxShadow: (theme) => theme.shadows[3]}}
        href={`/${route.slug.current}`}
        variant="outlined"
        color={color || 'inherit'}
        size="large"
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
          sx={{boxShadow: (theme) => theme.shadows[3]}}
          href={link}
          variant="contained"
          color={color || 'secondary'}
          size="large"
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
        size="large"
        color={color || 'inherit'}
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
