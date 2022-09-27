import React, {useEffect, useState} from 'react'
import dynamic from 'next/dynamic'
import {Fade, Grow, useMediaQuery} from '@mui/material'

import client from 'client'
import imageUrlBuilder from '@sanity/image-url'
import {useTheme} from '@emotion/react'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

//COMPONENT CODE
export default (props) => {
  const {paused, width, height} = props

  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('md'))

  const windowResized = (p5, e) => {
    p5.resizeCanvas(width, height, true)
    p5.setup()
  }

  if (typeof window === undefined) return null

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width || 0, height || 0).parent(canvasParentRef)
  }

  const draw = (p5) => {
    if (paused) return null

    p5.background(0)
    p5.stroke(255)

    p5.fill(0)
    p5.ellipse(p5.mouseX, p5.mouseY, 50, 50)
  }

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />
}
