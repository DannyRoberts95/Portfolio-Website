import React from 'react'
import dynamic from 'next/dynamic'
import {Box} from '@mui/material'

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

export default (props) => {
  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(window.innerWidth, 500).parent(canvasParentRef)
    p5.strokeCap(p5.SQUARE)
  }

  const draw = (p5) => {
    p5.background(255)
    //translate the matrix to the center of the canvas
    p5.translate(p5.width / 2, p5.height / 2)

    //The number of lines forming the circle is mapped to the mouses Y postition (retarained to an int)
    var circleResolution = p5.max(4, p5.int(p5.map(p5.mouseX, 0, p5.height, 2, 36)))
    // Circle radius is mapped to the mouses X position
    var radius = p5.mouseX - p5.width * 0.33
    //TAU is a circle constant relating the circumfrance of a circle to its radius (6.2831855)
    //the angle of incrementation is found by dividing TAU by however many lines there are making up the Circle
    var angle = p5.TAU / circleResolution
    //mouseY is mapped to the stroke weight
    p5.strokeWeight(p5.mouseY / 36)

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

  return (
    <Box width={'100%'} sx={{border: '1px solid red'}}>
      <Sketch setup={setup} draw={draw} />
    </Box>
  )
}
