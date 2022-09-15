import React, {useEffect, useState, useRef} from 'react'
import capitalizeString from '../../../utils/capitalizeString'
import * as SketchComponents from '../../../sketches'
import useOnScreen from '../../../hooks/useOnScreen'
import {Box} from '@mui/system'
import {Fade} from '@mui/material'

function isServerSide() {
  return !(typeof window != 'undefined' && window.document)
}
const isServer = isServerSide()

export default function SketchBuilder(props) {
  //accept a css value for the width and height of the sketch container
  const {type, width = '500px', height = '500px'} = props
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
  if (isServer) return null

  const {Sketch, width, height} = props
  const sketchContainerRef = useRef(null)
  const onScreen = useOnScreen(sketchContainerRef)

  const [sw, setSw] = useState(sketchContainerRef.current?.offsetWidth || 0)
  const [sh, setSh] = useState(sketchContainerRef.current?.offsetHeight || 0)

  useEffect(() => {
    setSw(sketchContainerRef.current?.offsetWidth)
    setSh(sketchContainerRef.current?.offsetHeight)
  }, [])

  if (!isServer) {
    window.addEventListener('resize', (e) => {
      setSw(sketchContainerRef.current?.offsetWidth)
      setSh(sketchContainerRef.current?.offsetHeight)
    })
  }

  if (Sketch) {
    return (
      // apply the desired css width and height to the conatiner
      <Box component={'div'} ref={sketchContainerRef} sx={{width, height, overflow: 'hidden'}}>
        {/* if the component is in the view port, mount the sketch and pass it the numeric width and height values */}
        {onScreen ? <Sketch width={sw} height={sh} /> : <Box width={sh} height={sw} />}
      </Box>
    )
  }
}
