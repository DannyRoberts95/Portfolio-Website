import {useMediaQuery} from '@mui/material'
import dynamic from 'next/dynamic'

import {useTheme} from '@emotion/react'
import imageUrlBuilder from '@sanity/image-url'
import client from 'client'

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

  let tileNumber
  let tileSize
  let px, py

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width || 0, height || 0).parent(canvasParentRef)
    p5.colorMode(p5.HSB, 360, 100, 100, 100)
    p5.rectMode(p5.CENTER)
    p5.cursor(p5.CROSS)
    p5.ellipseMode(p5.CENTER)
    p5.strokeCap(p5.ROUND)
    p5.angleMode(p5.DEGREES)

    px = p5.width / 2
    py = p5.height / 2
    tileNumber = p5.width / 50
  }

  const draw = (p5) => {
    if (paused) return null

    px = p5.lerp(px, p5.mouseX, 0.05)
    py = p5.lerp(py, p5.mouseY, 0.05)

    p5.background(100)
    p5.randomSeed(1)

    tileSize = p5.width / tileNumber
    let sWidth = 5

    for (let x = 0; x <= p5.width + tileSize; x += tileSize) {
      for (let y = 0; y <= p5.height; y += tileSize) {
        let size = tileSize * 0.33
        let posX = x
        let posY = y
        let angle = p5.atan2(py - posY, px - posX)

        p5.push()
        p5.translate(posX, posY)
        p5.rotate(angle)
        p5.stroke(0)
        p5.strokeWeight(sWidth)
        p5.line(-0, -0, size, size)
        p5.pop()
      }
    }
  }

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />
}
