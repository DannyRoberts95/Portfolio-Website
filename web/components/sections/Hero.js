import React, {useState} from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../client'
import Cta from '../Cta'
import {useTheme} from '@emotion/react'
import {Container, Divider, Fade, Typography, useMediaQuery} from '@mui/material'
import {Box} from '@mui/system'
import ReactPlayer from 'react-player'
import Image from 'next/image'

function urlFor(source) {
  return imageUrlBuilder(client).image(source.asset)
}

function Hero(props) {
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.down('md'))
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const [loadedImage, setloadedImage] = useState(false)
  const handleImageLoaded = () => setloadedImage(true)

  const [loadedVideo, setloadedVideo] = useState(false)
  const handleVideoLoaded = () => setloadedVideo(true)

  const {heading, backgroundImage, backgroundVideo, tagline, ctas, dark} = props

  const bgColor = () => {
    if (backgroundImage || backgroundVideo) return null
    return {
      backgroundColor: !dark ? theme.palette.secondary.main : theme.palette.primary.main,
    }
  }

  return (
    <Box
      sx={[
        {
          position: 'relative',
          overflow: 'hidden',

          color: dark ? theme.palette.secondary.main : theme.palette.primary.main,
          ...bgColor(),
          ...(!dark
            ? {
                borderTop: `1px solid ${theme.palette.primary.main}`,
                borderBottom: `1px solid ${theme.palette.primary.main}`,
              }
            : {
                borderTop: `1px solid ${theme.palette.secondary.main}`,
                borderBottom: `1px solid ${theme.palette.secondary.main}`,
              }),

          py: 16,
        },
      ]}
    >
      {backgroundImage && (
        <Fade in={backgroundImage && loadedImage}>
          <Box
            id="heroImageContainer"
            sx={{
              zIndex: 0,
              overflow: 'hidden',
              position: 'absolute',
              backgroundColor: theme.palette.primary.main,
              minWidth: '100%',
              height: '100%',
              top: 0,
            }}
          >
            <Image
              id="heroImage"
              layout="fill"
              onLoad={handleImageLoaded}
              objectFit="cover"
              quality={85}
              alt="hero_banner_illustartion"
              blurDataURL={urlFor(backgroundImage).width(480).url().toString()}
              src={urlFor(backgroundImage).auto('format').url()}
              srcSet={urlFor(backgroundImage).auto('format').url()}
            />
          </Box>
        </Fade>
      )}

      {/* VIDEO  */}
      {backgroundVideo && (
        <Box
          id="heroVideoContainer"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            height: '100%',
            width: '177.77777778vh' /* 100 * 16 / 9 */,
            minWidth: '100%',
            minHeight: '56.25vw' /* 100 * 9 / 16 */,
          }}
        >
          <Fade in={backgroundVideo && !isSm && loadedVideo}>
            <span>
              <ReactPlayer
                id="heroVideo"
                width="100%"
                height="100%"
                onReady={handleVideoLoaded}
                styles={{
                  position: 'absolute',
                  left: ' 50%' /* % of surrounding element */,
                  top: ' 50%',
                  transform: ' translate(-50%, -50%)' /* % of current element */,
                }}
                loop
                muted
                playing
                controls={false}
                crossOrigin="anonymous"
                url={backgroundVideo}
                type="video/.mp4"
              />
            </span>
          </Fade>
        </Box>
      )}

      <Container maxWidth={'md'} sx={{mixBlendMode: 'luminosity'}}>
        <Typography
          align="center"
          gutterBottom
          variant={'h3'}
          sx={[
            {
              position: 'relative',
              lineHeight: 1,
              textShadow: ' 0 2px 2px rgba(0, 0, 0, 0.33)',
              mb: 2,
            },
            isMd && {
              lineHeight: 1.25,
            },
          ]}
        >
          {heading}
        </Typography>

        <Typography align="center" gutterBottom variant={'body1'}>
          {tagline}
        </Typography>

        {ctas && (
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              '> *:not(:first-of-type)': {ml: 2},
            }}
          >
            {ctas.map((cta) => (
              <Cta {...cta} key={cta._key} color={dark ? 'secondary' : 'primary'} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  )
}

Hero.propTypes = {
  heading: PropTypes.string,
  backgroundImage: PropTypes.object,
  tagline: PropTypes.string,
  ctas: PropTypes.arrayOf(PropTypes.object),
}

export default Hero
