import {useMediaQuery} from '@mui/material'
import dynamic from 'next/dynamic'

import {useTheme} from '@emotion/react'
import imageUrlBuilder from '@sanity/image-url'
import client from 'client'

function hexToRgb(hex) {
  const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (normal) return normal.slice(1).map((e) => parseInt(e, 16))

  const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i)
  if (shorthand) return shorthand.slice(1).map((e) => 0x11 * parseInt(e, 16))

  return null
}
function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})
let charString = 'DHD'

let radius = 500
let resolution = charString.length * 4

let innerRings = 5
let agentSize = radius / (innerRings / 2)

let col, bgCol

let lay, fb

//COMPONENT CODE
export default (props) => {
  let {paused, width, height} = props

  let theme = useTheme()
  let isSm = useMediaQuery(theme.breakpoints.down('md'))

  let windowResized = (p5, e) => {
    p5.resizeCanvas(width, height, true)
    p5.setup()
  }

  if (typeof window === undefined) return null

  let setup = (p5, canvasParentRef) => {
    p5.createCanvas(width || 0, height || 0).parent(canvasParentRef)
    lay = p5.createGraphics(p5.width, p5.height)
    col = p5.color(theme.palette.primary.main)
    bgCol = p5.color(theme.palette.primary.contrastText)

    fb = p5.createImage(p5.width * 0.25, p5.height * 0.25)
    p5.imageMode(p5.CENTER)
    p5.rectMode(p5.CENTER)

    lay.textAlign(p5.CENTER, p5.CENTER)
    lay.textFont('monospace')
    lay.background(255)
    p5.background(255)
  }

  let draw = (p5) => {
    if (paused) return null

    lay.reset()
    lay.clear()
    lay.fill(0, 255)
    lay.strokeWeight(agentSize * 0.01)
    lay.stroke(255)

    lay.translate(width / 2, height / 2)

    lay.rotate(p5.frameCount * 0.005)
    // radius = p5.map(p5.mouseX, 0, p5.width, -p5.width * 1, p5.width * 1)
    // agentSize = p5.map(p5.mouseX, 0, p5.width, 16, p5.width * 1)

    // for (let i = innerRings; i > 0; i--) {
    for (let i = 0; i < innerRings; i++) {
      let scl = 1 - (1 / innerRings) * i
      let r = radius * scl
      for (let j = 0; j < resolution; j++) {
        let a = (p5.TAU / resolution) * j
        let x = p5.cos(a) * r
        let y = p5.sin(a) * r
        lay.push()

        let rotation = p5.atan2(0 - y, 0 - x)

        lay.translate(x, y)
        lay.rotate(rotation)
        lay.textSize(agentSize * scl)
        lay.text(charString[j % charString.length], 0, 0)
        lay.pop()
      }
    }

    p5.background(255, 20)
    p5.image(lay, p5.width / 2, p5.height / 2, p5.width, p5.height)

    // // FEEDBACK
    // fb = p5.get(0, 0, p5.width, p5.height)
    // let fbScl = 0.75
    // let imgScl = 0.15
    // fb.resize(p5.width * imgScl, p5.height * imgScl)
    // p5.fill(0)

    // p5.rect(p5.width / 2, p5.height / 2, p5.width * fbScl * 1.01, p5.height * fbScl * 1.01)
    // p5.image(fb, p5.width / 2, p5.height / 2, p5.width * fbScl, p5.height * fbScl)
  }

  let mousePressed = (p5, canvasParentRef) => {
    p5.clear()
  }

  // let keyPressed = (p5, canvasParentRef) => {
  //   p5.clear()
  // }

  return (
    <Sketch setup={setup} draw={draw} windowResized={windowResized} mouseClicked={mousePressed} />
  )
}
