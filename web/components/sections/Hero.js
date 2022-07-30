import React, {useState} from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../client'
import StyledBlockContent from '../StyledBlockContent'
import Cta from '../Cta'
import {useTheme} from '@emotion/react'
import {Container, Fade, Typography, useMediaQuery} from '@mui/material'
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

  const {heading, backgroundImage, backgroundVideo, firstComponent, tagline, ctas} = props

  return (
    <Box
      sx={[
        {
          position: 'relative',
          color: '#fff',
          pb: isSm ? 10 : 10,
          overflow: 'hidden',

          '&::before': {
            content: "''",
            position: 'absolute',
            top: '0%',
            left: 0,

            backgroundImage:
              'linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 50% ,  rgba(0,0,0,0.5) 100%)',
            width: '100%',
            height: '100%',
            zIndex: -1,
          },
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
              zIndex: -4,
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
            gutterBottom
            variant={firstComponent ? 'h1' : 'h2'}
            sx={[
              {
                position: 'relative',
                fontSize: '4.5em',
                fontWeight: 600,
                lineHeight: 1,
                textShadow: ' 0 2px 2px rgba(0, 0, 0, 0.33)',
                margin: 0,
                padding: 0,
                pt: '12.5rem',
              },
              isMd && {
                fontSize: 42,
                lineHeight: 1.25,
                pt: 12,
              },
            ]}
          >
            {heading}
          </Typography>

          <Box sx={{mt: 2, zIndex: 10}}>{tagline && <StyledBlockContent blocks={tagline} />}</Box>

          {ctas && (
            <Box sx={{mt: '3rem', display: 'flex', '> *:not(:first-of-type)': {ml: 2}}}>
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
  tagline: PropTypes.array,
  ctas: PropTypes.arrayOf(PropTypes.object),
}

export default Hero
