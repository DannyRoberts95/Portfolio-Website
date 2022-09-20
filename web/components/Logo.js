import React, {forwardRef} from 'react'

import PropTypes from 'prop-types'
import {Box} from '@mui/material'
import Link from './CustomLink'
import Image from 'next/image'

const Logo = forwardRef((props, ref) => {
  const {logo, alt = 'site logo', href = '/', size = 50, ...others} = props

  if (!logo || !logo.asset) {
    return null
  }

  return (
    <Box width={size} height={size} position="relative" {...others}>
      <Link ref={ref} href={href}>
        <Image layout="intrinsic" src={logo.asset.url} alt={alt} width={size} height={size} />
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
