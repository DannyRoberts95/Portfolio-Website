import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../client'
import StyledBlockContent from '../StyledBlockContent'
import Cta from '../Cta'
import Image from 'next/image'
import {Box} from '@mui/system'
import {Stack, Container, useMediaQuery, Grow} from '@mui/material'
import {useTheme} from '@emotion/react'
import SectionTitle from '../SectionTitle'
import SectionContainer from '../SectionContainer'

const builder = imageUrlBuilder(client)

function ImageSection(props) {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const {sectionTitle, reversed, elevateImage, text, image, cta} = props
  const {aspectRatio} = image

  let dimensiosns = null
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
    default:
      dimensiosns = {width: 1920, height: 1080}
      break
  }

  return (
    <SectionContainer maxWidth="lg" sectionGap="sm">
      <Stack
        sx={[
          {width: '100%', flexDirection: 'row', alignItems: 'center'},
          reversed && {flexDirection: 'row-reverse'},
          isSm && {flexDirection: 'column-reverse'},
        ]}
      >
        <Box sx={[{flexBasis: '50%'}, isSm && {flexBasis: '100%', borderRadius: 2}]}>
          {sectionTitle && <SectionTitle block={sectionTitle} />}

          {text && <StyledBlockContent blocks={text} />}

          <Box sx={{my: 3}}>{cta && <Cta {...cta} color={cta.isPrimary ? null : 'primary'} />}</Box>
        </Box>

        <Grow in timeout={1500}>
          <Box
            component="figure"
            sx={[
              {
                flexBasis: '50%',
                width: '100%',
                m: 4,
                position: 'relative',
              },
              isSm && {flexBasis: '100%', borderRadius: 2, height: 100, m: 2},
              elevateImage && {overflow: 'hidden', boxShadow: theme.shadows[4]},
            ]}
          >
            {image && (
              <Image
                objectFit="contain"
                layout="responsive"
                placeholder="blur"
                width={dimensiosns?.width || null}
                height={dimensiosns?.height || null}
                loading="lazy"
                quality={50}
                blurDataURL={builder.image(image).url()}
                src={builder.image(image).url()}
                // styles={{
                //   display: 'block',
                //   maxInlineSize: ' 100%',
                //   blockSize: 'auto',
                //   aspectRatio: aspectRatio,
                // }}
                alt={image.alt}
              />
            )}
          </Box>
        </Grow>
      </Stack>
    </SectionContainer>
  )
}

ImageSection.propTypes = {
  heading: PropTypes.string,
  label: PropTypes.string,
  text: PropTypes.array,
  image: PropTypes.shape({
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  }),
  backgroundImage: PropTypes.string,
  tagline: PropTypes.string,
  cta: PropTypes.object,
  elevateImage: PropTypes.bool,
  reversed: PropTypes.bool,
}

export default ImageSection
