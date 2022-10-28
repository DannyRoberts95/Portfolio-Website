import {useTheme} from '@emotion/react'
import {useMediaQuery} from '@mui/material'
import {Box} from '@mui/system'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'
import PropTypes from 'prop-types'
import {useState} from 'react'
import client from '../client'
import LightBox from './LightBox'

function urlFor(source) {
  return imageUrlBuilder(client).image(source.asset)
}

function Hero(props) {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const {image, caption, alt} = props

  const [open, setOpen] = useState(false)

  if (!image) return null

  const imgSrc = urlFor(image).format('webp').url()

  const handleClick = () => {
    !isSm && setOpen(!open)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box
      onClick={handleClick}
      sx={[
        {
          cursor: 'zoom-in',
          position: 'relative',
          overflow: 'hidden',
          minHeight: isSm ? '33vh' : '66vh',
          transition: 'all 0.5s ease-in-out',

          '&::before': {
            content: "''",
            position: 'absolute',
            top: '0%',
            left: 0,

            backgroundImage:
              'linear-gradient(0deg, rgba(0,0,0,0) 0% ,rgba(0,0,0,0) 80%,  rgba(0,0,0,0.3) 100%)',
            width: '100%',
            height: '100%',
            zIndex: 2,
          },
        },
        isSm && {
          cursor: 'auto',
        },
      ]}
    >
      <Image
        id="postHeroIllustration"
        layout="fill"
        objectPosition="center"
        objectFit="cover"
        loading={'eager'}
        placeholder="blur"
        quality={100}
        priority
        alt={alt}
        blurDataURL={urlFor(image).width(480).format('webp').url()}
        src={imgSrc}
      />

      <LightBox open={open} src={imgSrc} caption={caption} alt={alt} handleClose={handleClose} />
    </Box>
  )
}

Hero.propTypes = {
  image: PropTypes.object.isRequired,
  alt: PropTypes.string,
  caption: PropTypes.string,
}

export default Hero
