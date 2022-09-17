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

  const {heading, backgroundImage, backgroundVideo, firstComponent, tagline, ctas, dark} = props

  console.log(props)

  return (
    <Box
      sx={[
        {
          position: 'relative',
          color: dark ? theme.palette.secondary.main : theme.palette.primary.main,
          backgroundColor: dark ? theme.palette.primary.main : theme.palette.secondary.main,

          overflow: 'hidden',

          ...(dark && {
            borderTop: `1px solid ${theme.palette.primary.main}`,
            borderBottom: `1px solid ${theme.palette.primary.main}`,
          }),

          py: 10,

          // '&::before': {
          //   content: "''",
          //   position: 'absolute',
          //   top: '0%',
          //   left: 0,

          //   backgroundImage:
          //     'linear-gradient(0deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.2) 15% ,rgba(0,0,0,0.3) 50% ,rgba(0,0,0,0.2) 85% ,  rgba(0,0,0,0) 100%)',
          //   width: '100%',
          //   height: '100%',
          //   zIndex: -1,
          // },
          'p>a': {
            color: 'inherit',
          },
        },
      ]}
    >
      {backgroundImage && (
        <Fade in={(backgroundImage && loadedImage) || firstComponent}>
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
              loading={firstComponent ? 'eager' : 'lazy'}
              objectFit="cover"
              quality={85}
              priority={firstComponent}
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
            zIndex: -4,
            backgroundColor: theme.palette.primary.main,
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
      <Fade in timeout={1000}>
        <Container maxWidth="lg" sx={{zIndex: 10}}>
          <Typography
            align="center"
            gutterBottom
            variant={'h3'}
            sx={[
              {
                position: 'relative',
                lineHeight: 1,
                textShadow: ' 0 2px 2px rgba(0, 0, 0, 0.33)',
                margin: 0,
              },
              isMd && {
                lineHeight: 1.25,
              },
            ]}
          >
            {heading}
          </Typography>

          <Divider
            variant="middle"
            light
            sx={{border: '1px solid white', maxWidth: '66%', margin: 'auto', my: 1}}
          />

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
                <Cta {...cta} key={cta._key} />
              ))}
            </Box>
          )}
        </Container>
      </Fade>
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
