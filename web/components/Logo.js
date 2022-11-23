import {forwardRef} from 'react'

import {Box} from '@mui/material'
import Image from 'next/image'
import PropTypes from 'prop-types'
import Link from './CustomLink'

import buildUrl from '../utils/helpers/urlForSanityImage'

const Logo = forwardRef((props, ref) => {
  const {logo, alt = 'site logo', href = '/', size = 50, ...others} = props

  if (!logo || !logo.asset) {
    return null
  }

  return (
    <Box width={size} height={size} position="relative" {...others}>
      <Link ref={ref} href={href}>
        <Image
          layout="intrinsic"
          quality={100}
          src={buildUrl(logo)
            .width(size * 2)
            .height(size * 2)
            .auto('format')
            .url()}
          alt={alt}
          width={size}
          height={size}
        />
      </Link>
    </Box>
  )
})

Logo.propTypes = {
  logo: PropTypes.shape({
    asset: PropTypes.shape({
      url: PropTypes.string,
    }),
    logo: PropTypes.string,
  }),
  href: PropTypes.string,
}
Logo.displayName = 'Logo'
export default Logo
