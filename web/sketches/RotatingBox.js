import React, {useEffect, useState} from 'react'
import dynamic from 'next/dynamic'
import {Fade, Grow} from '@mui/material'

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

export default (props) => {
  const {paused, width, height} = props

  if (typeof window === undefined) return null

  let lay,
    px = 0,
    py = 0

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width || 0, height || 0).parent(canvasParentRef)
    // p5.frameRate(30)
    lay = p5.createGraphics(p5.width, p5.height, p5.WEBGL)
    p5.imageMode(p5.CENTER)
    p5.background(0)
  }

  const draw = (p5) => {
    if (paused) return null

    px = p5.lerp(px, p5.mouseX, 0.01)
    py = p5.lerp(px, p5.mouseY, 0.01)

    lay.reset()
    lay.clear()

    lay.noFill()

    // lay.rotate(p5.radians(p5.frameCount / 2))
    // lay.rotateX(p5.radians(px / 2))
    // lay.rotateY(p5.radians(py / 2))

    lay.rotate(p5.radians(px))
    lay.strokeWeight(2)
    lay.stroke(255)
    lay.box(py * 2)

    p5.background(0, 10)
    p5.translate(p5.width / 2, p5.height / 2)
    p5.image(lay, 0, 0)
  }

  const windowResized = (p5, e) => {
    p5.resizeCanvas(width, height, true)
    p5.setup()
  }

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />
}
