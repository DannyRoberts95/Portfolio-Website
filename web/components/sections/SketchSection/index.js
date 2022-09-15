import React, {useRef} from 'react'
import {Container, Grid} from '@mui/material'
import SketchBuilder from '../SketchBuilder'

export default function SketchSection(props) {
  //accept a css value for the width and height of the sketch container
  const {type} = props

  return (
    <Container disableGutters maxWidth="100%">
      <Grid container spacing={0}>
        <Grid item xs={6}>
          text
        </Grid>
        <Grid item xs={6}>
          <SketchBuilder type={type} width={'100%'} height="100vh" />
        </Grid>
      </Grid>
    </Container>
  )
}
