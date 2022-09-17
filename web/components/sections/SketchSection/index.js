import React, {useRef} from 'react'
import {Box, Container, Grid, Typography, useMediaQuery} from '@mui/material'
import SketchBuilder from '../SketchBuilder'
import {useTheme} from '@emotion/react'
import SectionContainer from 'components/SectionContainer'
import PostBlockContent from 'components/PostBlockContent'
import StyledBlockContent from 'components/StyledBlockContent'

export default function SketchSection(props) {
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('sm'))
  //accept a css value for the width and height of the sketch container
  const {type, body} = props

  return (
    <SectionContainer maxWidth={false}>
      <Grid container spacing={0}>
        <Grid item sm={12} md={6}>
          <Box
            width="100%"
            sx={{
              position: ' -webkit-sticky',
              position: 'sticky',
              top: theme.shape.headerHeight - 6,

              py: 1,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
          >
            <Container>
              <Typography variant="h2">hello</Typography>
            </Container>
          </Box>
          <Box sx={{p: 2}}>
            <StyledBlockContent blocks={body} />
          </Box>
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          sx={{borderLeft: (theme) => `2px solid ${theme.palette.primary.main}`}}
        >
          <SketchBuilder type={type} width={'100%'} height={'100vh'} />
        </Grid>
      </Grid>
    </SectionContainer>
  )
}
