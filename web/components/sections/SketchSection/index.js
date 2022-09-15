import React, {useRef} from 'react'
import capitalizeString from '../../../utils/capitalizeString'
import * as SketchComponents from './sketches'
import useOnScreen from '../../../hooks/useOnScreen'
import {Box} from '@mui/system'

export default function SketchBuilder(props) {
  //accept a css value for the width and height of the sketch container
  const {type, width = '100vw', height = '100vh'} = props
  //Grab the sketch referenced by the parent or default to the first one
  const Sketch =
    SketchComponents[capitalizeString(type)] || SketchComponents[Object.keys(SketchComponents)[0]]
  //If the sketch exists then pass it to the renderer along with the css width and height from the parent...
  if (Sketch) return <SketchRenderer Sketch={Sketch} width={width} height={height} />
  console.error('Cant find Sketch', type) // eslint-disable-line no-console
  return null
}

const SketchRenderer = (props) => {
  //grab the css width and height to style the container div
  const {Sketch, width, height} = props
  const sketchContainerRef = useRef(null)
  const onScreen = useOnScreen(sketchContainerRef)

  //grab the container div, which has already been styled with width and height,
  //and pull the numeric values for width and height to pass to p5
  const sw = sketchContainerRef.current?.offsetWidth
  const sh = sketchContainerRef.current?.offsetHeight

  if (Sketch) {
    return (
      // apply the desired css width and height to the conatiner
      <Box component={'div'} ref={sketchContainerRef} sx={{width, height}}>
        {/* if the component is in the view port, mount the sketch and pass it the numeric width and height values */}
        {onScreen ? <Sketch width={sw} height={sh} /> : <Box width={sh} height={sw} />}
      </Box>
    )
  }
}
