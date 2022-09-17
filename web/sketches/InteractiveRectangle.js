import React, {useEffect, useState} from 'react'
import dynamic from 'next/dynamic'
import {Fade, Grow} from '@mui/material'

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

//ADD freeze when offscreen
const px = null
const py = null
const noiseSeed = Math.random(100000)

const rectangleCount = 20

export default (props) => {
  const {paused, width, height} = props

  if (typeof window === undefined) return null

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width || 0, height || 0).parent(canvasParentRef)
    p5.noiseSeed(noiseSeed)
    p5.rectMode(p5.CENTER)
    p5.cursor(p5.CROSS)

    px = p5.width / 2
    py = p5.height / 2

    p5.background(255)
    p5.stroke(0)
    p5.strokeWeight(2)
    p5.fill(255)
  }

  const draw = (p5) => {
    if (paused) return null
    p5.background(255)

    px = p5.lerp(px, p5.mouseX - p5.width / 2, 0.25)
    py = p5.lerp(py, p5.mouseY - p5.height / 2, 0.25)

    for (let i = rectangleCount; i > 0; i--) {
      const y = py / (i + 1)
      const x = px / (i + 1)

      const w = p5.map(
        i + 1,
        1,
        rectangleCount,
        p5.width / rectangleCount,
        p5.width - p5.width / rectangleCount
      )
      const h = p5.map(
        i + 1,
        1,
        rectangleCount,
        p5.height / rectangleCount,
        p5.height - p5.height / rectangleCount
      )

      p5.stroke(0)
      p5.fill(p5.map(i, 0, rectangleCount, 0, 255))
      p5.rect(x + p5.width / 2, y + p5.height / 2, w, h)
    }
  }

  const windowResized = (p5, e) => {
    p5.resizeCanvas(width, height, true)
    p5.setup()
  }

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />
}
