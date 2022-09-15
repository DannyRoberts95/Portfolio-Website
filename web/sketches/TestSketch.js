import React, {useEffect, useState} from 'react'
import dynamic from 'next/dynamic'
import {Fade, Grow} from '@mui/material'

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

//ADD freeze when offscreen
const px = 0
const py = 0

export default (props) => {
  const {paused, width, height} = props

  if (typeof window === undefined) return null

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width || 0, height || 0).parent(canvasParentRef)
    p5.background(0)
  }

  const draw = (p5) => {
    if (paused) return null

    px = p5.lerp(px, p5.mouseX, 0.1)
    py = p5.lerp(py, p5.mouseY, 0.1)

    p5.rectMode(p5.CENTER)
    p5.fill(255)
    p5.translate(px, py)
    p5.ellipse(0, 0, p5.noise(p5.frameCount / 200) * 100, p5.noise(p5.frameCount / 200) * 100)
  }

  const windowResized = (p5, e) => {
    p5.resizeCanvas(width, height, true)
    p5.setup()
  }

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />
}
