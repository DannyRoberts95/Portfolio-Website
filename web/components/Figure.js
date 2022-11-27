import {Typography} from '@mui/material'
import {Box} from '@mui/system'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'
import PropTypes from 'prop-types'
import {useState} from 'react'
import client from '../client'
import LightBox from './LightBox'

const builder = imageUrlBuilder(client)

function Figure(props) {
  const {value, hideCaption, lightBox = false} = props
  const [lightBoxOpen, setLightBoxOpen] = useState(false)

  const handleOpen = () => {
    setLightBoxOpen(true)
  }
  const handleClose = () => {
    setLightBoxOpen(false)
  }

  let dimensiosns = null

  if (!value) return null

  const {aspectRatio, alt, caption, asset, figureWidth, figureHeight} = value

  if (!asset) {
    return null
  }

  switch (aspectRatio) {
    case '3/4':
      dimensiosns = {width: 960, height: 1280}
      break
    case '4:3':
      dimensiosns = {width: 1280, height: 960}
      break
    case '1/1':
      dimensiosns = {width: 1080, height: 1080}
      break
    case 'custom':
      console.log(value)
      dimensiosns = {width: figureWidth, height: figureHeight}
      break
    default:
      dimensiosns = {width: 1920, height: 1080}
      break
  }

  console.log(dimensiosns)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        component={'figure'}
        sx={[
          {
            cursor: lightBox ? 'zoom-in' : 'auto',
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            m: 0,
          },
        ]}
      >
        <Image
          objectFit="cover"
          layout={aspectRatio === 'custom' ? 'intrinsic' : 'responsive'}
          width={dimensiosns?.width || null}
          height={dimensiosns?.height || null}
          placeholder="blur"
          loading="lazy"
          blurDataURL={builder.image(asset).url()}
          src={builder.image(asset).url()}
          alt={alt}
          onClick={handleOpen}
        />
      </Box>

      {!hideCaption && caption && (
        <Typography variant="caption" color="textSecondary" sx={{mt: 1}}>
          //:{caption}
        </Typography>
      )}

      <LightBox
        open={lightBoxOpen && lightBox}
        handleClose={handleClose}
        src={builder.image(asset).url()}
        alt={alt}
        caption={caption}
      />
    </Box>
  )
}

Figure.propTypes = {
  node: PropTypes.shape({
    alt: PropTypes.string,
    aspectRatio: PropTypes.string,
    caption: PropTypes.string,
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  }),
}
export default Figure
