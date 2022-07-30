import PropTypes from 'prop-types'
import React from 'react'
import {Box} from '@mui/system'
import {Container, Fade, Typography} from '@mui/material'
import {useTheme} from '@emotion/react'
import MailchimpInput from '../MailchimpInput'
import fireGtag from '../../utils/fireGtag'
import {useRouter} from 'next/router'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../client'

function urlFor(source) {
  return imageUrlBuilder(client).image(source.asset)
}

export default function MailchimpSection(props) {
  const theme = useTheme()
  const {asPath} = useRouter()
  const {heading, subtitle, backgroundImage = null, tags = null} = props
  const handleSignUp = () => {
    fireGtag('sign_up', {label: asPath})
  }

  const backgroundStyles = backgroundImage
    ? {
        '&::before': {
          content: "''",
          position: 'absolute',
          top: '0%',
          left: 0,

          backgroundImage:
            'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 50% ,  rgba(0,0,0,0) 100%)',
          width: '100%',
          height: '100%',
          zIndex: -1,
        },
      }
    : {}

  return (
    <Box
      component="section"
      sx={{
        color: '#fff',
        textShadow: ' 0 2px 2px rgba(0, 0, 0, 0.33)',
        position: 'relative',
        py: 8,
        ...backgroundStyles,
      }}
    >
      <Box
        id="mailchimpImageContainer"
        sx={{
          zIndex: -4,
          overflow: 'hidden',
          position: 'absolute',
          backgroundColor: theme.palette.primary.dark,
          backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          minWidth: '100%',
          height: '100%',
          top: 0,
        }}
      >
        {backgroundImage && (
          <Image
            id="mailChimpSectionImage"
            layout="fill"
            loading={'lazy'}
            objectFit="cover"
            quality={85}
            // style={{position: 'fixed'}}
            alt="hero_banner_illustartion"
            blurDataURL={urlFor(backgroundImage).width(480).height(260).url().toString()}
            src={urlFor(backgroundImage).auto('format').url()}
            srcSet={urlFor(backgroundImage).auto('format').url()}
          />
        )}
      </Box>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h2" color="inherit" align="center" gutterBottom>
          {heading}
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight={400}
          component="h3"
          color="inherit"
          align="center"
        >
          {subtitle}
        </Typography>
        <MailchimpInput handleSumbitComplete={handleSignUp} tags={tags} />
      </Container>
    </Box>
  )
}

MailchimpSection.propTypes = {
  heading: PropTypes.string,
  subtitle: PropTypes.string,
}
