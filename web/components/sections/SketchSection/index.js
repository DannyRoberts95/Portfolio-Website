import React, {useRef} from 'react'
import {Container, Grid, useMediaQuery} from '@mui/material'
import SketchBuilder from '../SketchBuilder'
import {useTheme} from '@emotion/react'

export default function SketchSection(props) {
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('sm'))
  //accept a css value for the width and height of the sketch container
  const {type} = props

  return (
    <Container disableGutters maxWidth="100%">
      <Grid container spacing={0}>
        <Grid item sm={12} md={6}>
          text
        </Grid>
        <Grid item sm={12} md={6}>
          <SketchBuilder type={type} width={'100%'} height={isMd ? '100vh' : '50vh'} />
        </Grid>
      </Grid>
    </Container>
  )
}
