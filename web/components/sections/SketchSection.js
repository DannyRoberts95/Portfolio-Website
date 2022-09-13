import React from 'react'
import PropTypes from 'prop-types'
import {Box} from '@mui/material'

export default function SketchSection(props) {
  // const {sectionTitle, text} = props

  return <Box>HELLO</Box>
}

SketchSection.propTypes = {
  sectionTitle: PropTypes.object,
  text: PropTypes.arrayOf(PropTypes.object),
}
