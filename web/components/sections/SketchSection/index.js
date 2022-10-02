import {useTheme} from '@emotion/react'
import {Box, Container, Grid, Typography, useMediaQuery} from '@mui/material'
import SectionContainer from 'components/SectionContainer'
import StyledBlockContent from 'components/StyledBlockContent'
import SketchBuilder from '../SketchBuilder'

import Cta from 'components/Cta'
import SectionTitle from 'components/SectionTitle'
import techText from '../../../utils/helpers/techText'

export default function SketchSection(props) {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('md'))
  //accept a css value for the width and height of the sketch container
  const {type, sectionTitle, body, ctas, reversed, fullWidth} = props

  const mediaHeight = isSm ? '50vh' : '95vh'

  return (
    <SectionContainer maxWidth={false}>
      <Grid container spacing={0} direction={reversed ? 'row-reverse' : 'row'}>
        {!fullWidth && (
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
            {sectionTitle && <SectionTitle block={sectionTitle} />}
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
        )}
        <Grid
          item
          xs={12}
          md={fullWidth ? 12 : 6}
          sx={[
            {
              position: 'sticky',
              top: theme.shape.headerHeight,
              height: mediaHeight,
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
          {fullWidth && (
            <>
              <Container
                maxWidth={'md'}
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2,
                }}
              >
                <Typography
                  align="center"
                  gutterBottom
                  variant={'h2'}
                  sx={[
                    {
                      mb: 2,
                      textShadow: `3px 3px 6px #fff`,
                    },
                  ]}
                >
                  {sectionTitle.heading}
                </Typography>

                <Typography
                  align="center"
                  gutterBottom
                  variant={'h6'}
                  sx={{
                    textShadow: `2px 2px 3px #fff`,
                  }}
                >
                  {console.log(sectionTitle)}
                  {sectionTitle.label}
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
            </>
          )}
          <Typography
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: '-1',
            }}
          >
            {techText('LOADING...')}
          </Typography>
          <SketchBuilder type={type} width={'100%'} height={mediaHeight} />
        </Grid>
      </Grid>
    </SectionContainer>
  )
}
