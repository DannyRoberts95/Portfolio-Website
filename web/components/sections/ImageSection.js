import {useTheme} from '@emotion/react'
import {Container, Grid, useMediaQuery} from '@mui/material'
import {Box} from '@mui/system'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'
import PropTypes from 'prop-types'
import client from '../../client'
import Cta from '../Cta'
import SectionContainer from '../SectionContainer'
import StyledBlockContent from '../StyledBlockContent'

const builder = imageUrlBuilder(client)

function ImageSection(props) {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const {reversed, body, image, ctas} = props
  const {aspectRatio} = image

  const mediaHeight = isSm ? '50vh' : `calc(100vh-${theme.shape.headerHeight})`

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
    <SectionContainer maxWidth={false}>
      <Grid container spacing={0} direction={reversed ? 'row-reverse' : 'row'}>
        <Grid
          item
          xs={12}
          md={6}
          sx={[
            {
              borderRight: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
            reversed && {
              borderLeft: (theme) => `1px solid ${theme.palette.primary.main}`,
              borderRight: 'none',
            },
            isSm && {
              border: 'none',
              borderTop: (theme) => `1px solid ${theme.palette.primary.main}`,
              borderBottom: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
          ]}
        >
          <Container sx={{py: 2}}>
            <StyledBlockContent blocks={body} />

            {ctas && (
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  width: '100%',
                  '> *:not(:first-of-type)': {ml: 2},
                }}
              >
                {ctas.map((cta) => (
                  <Cta {...cta} key={cta._key} />
                ))}
              </Box>
            )}
          </Container>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={[
            {
              position: 'relative',
              maxHeight: mediaHeight,
              borderLeft: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
            reversed && {
              borderRight: (theme) => `1px solid ${theme.palette.primary.main}`,
              borderLeft: 'none',
            },
            isSm && {
              border: 'none',
              borderTop: (theme) => `1px solid ${theme.palette.primary.main}`,
              borderBottom: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
          ]}
        >
          {image && (
            <Box sx={{position: 'sticky', top: theme.shape.headerHeight}}>
              <Image
                objectFit="cover"
                layout="responsive"
                placeholder="blur"
                width={dimensiosns?.width || null}
                height={dimensiosns?.height || null}
                loading="lazy"
                quality={85}
                blurDataURL={builder.image(image).url()}
                src={builder.image(image).url()}
                alt={image.alt}
              />
            </Box>
          )}
        </Grid>
      </Grid>
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
