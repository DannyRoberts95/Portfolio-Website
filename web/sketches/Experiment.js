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
    py = 0,
    fb

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width || 0, height || 0).parent(canvasParentRef)
    // p5.frameRate(30)
    lay = p5.createGraphics(p5.width, p5.height, p5.WEBGL)
    fb = p5.createImage(p5.width / 4, p5.height / 4)
    p5.imageMode(p5.CENTER)

    p5.blendMode(p5.DIFFERENCE)
    p5.background(0)
  }

  const draw = (p5) => {
    if (paused) return null

    px = p5.lerp(px, p5.mouseX, 0.01)
    py = p5.lerp(px, p5.mouseY, 0.01)

    lay.reset()
    lay.clear()

    lay.stroke(0, 255, 55)
    lay.noFill()
    // lay.rotateY(p5.radians(p5.frameCount / 2))
    lay.rotateX(p5.radians(p5.frameCount / 2))
    // lay.rotateX(p5.radians(px / 2))
    // lay.rotateY(p5.radians(py / 2))

    lay.rotate(p5.radians(py))
    lay.box(300, p5.map(px, 0, p5.width, -300, 300))

    p5.background(0, 15)
    p5.translate(p5.width / 2, p5.height / 2)
    p5.image(lay, 0, 0)

    fb = p5.get(0, 0, p5.width, p5.height)
    // const fbScl = 0.91
    // const scl = 0.8

    const iterations = 5
    for (let i = 0; i < iterations; i++) {
      const scl = 1 - i * (1 / iterations)
      fb.resize(p5.width * scl, p5.height * scl)
      // p5.image(fb, 0, 0, p5.width * fbScl, p5.height * fbScl)
      p5.image(fb, 0, 0)
    }
  }

  const windowResized = (p5, e) => {
    p5.resizeCanvas(width, height, true)
    p5.setup()
  }

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />
}
