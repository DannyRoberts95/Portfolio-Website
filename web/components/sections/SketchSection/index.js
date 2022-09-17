import React, {useRef} from 'react'
import {Box, Container, Grid, Typography, useMediaQuery} from '@mui/material'
import SketchBuilder from '../SketchBuilder'
import {useTheme} from '@emotion/react'
import SectionContainer from 'components/SectionContainer'
import StyledBlockContent from 'components/StyledBlockContent'

import techText from '../../../utils/helpers/techText'
import Cta from 'components/Cta'

export default function SketchSection(props) {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('md'))
  //accept a css value for the width and height of the sketch container
  const {type, header, body, ctas, reversed} = props

  const mediaHeight = isSm ? '50vh' : '100vh'

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
          <Box
            width="100%"
            sx={{
              position: 'sticky',
              top: theme.shape.headerHeight - 6,
              py: 1,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              zIndex: 2,
            }}
          >
            <Container>
              <Typography variant="h2" letterSpacing={-5}>
                {techText(header)}
              </Typography>
            </Container>
          </Box>
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
              position: 'sticky',
              top: theme.shape.headerHeight - 6,
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
