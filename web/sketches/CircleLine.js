import React, {useEffect} from 'react'
import dynamic from 'next/dynamic'
import {Box} from '@mui/material'

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

export default (props) => {
  console.log('props', props)
  // useEffect(() => window.removeEventListener('resize', () => {}), [])

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)

    //FIX MEEE
    // const resizeSketch = () =>
    //   p5.resizeCanvas(canvasParentRef.offsetWidth, canvasParentRef.offsetHeight)
    // window.addEventListener('resize', resizeSketch)

    p5.mousePressed = () => console.log(props)

    p5.createCanvas(props.width, props.height).parent(canvasParentRef)
    p5.strokeCap(p5.SQUARE)
  }

  const draw = (p5) => {
    p5.background(255)
    //translate the matrix to the center of the canvas
    p5.translate(p5.width / 2, p5.height / 2)
    //The number of lines forming the circle is mapped to the mouses Y postition (retarained to an int)
    var circleResolution = p5.max(4, p5.int(p5.map(p5.mouseX, 0, p5.height, 6, 36)))
    // Circle radius is mapped to the mouses X position
    var radius = p5.map(p5.mouseX, 0, p5.width, 0, p5.width * 2)
    //TAU is a circle constant relating the circumfrance of a circle to its radius (6.2831855)
    //the angle of incrementation is found by dividing TAU by however many lines there are making up the Circle
    var angle = p5.TAU / circleResolution
    //mouseY is mapped to the stroke weight
    p5.strokeWeight(p5.map(p5.mouseY, 0, p5.width, 3, 36))

    //for every line to be drawn in the circle...
    for (var i = 0; i <= circleResolution; i++) {
      //find the Y value along the circles circumfrance
      var y = p5.cos(angle * i) * radius
      //find the X value along the circles circumfrance
      var x = p5.sin(angle * i) * radius
      //Draw the line
      p5.line(0, 0, x, y)
    }
  }

  return <Sketch setup={setup} draw={draw} />
}
