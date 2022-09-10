import {Container} from '@mui/material'
import React, {forwardRef} from 'react'

import PropTypes from 'prop-types'

const SectionContainer = forwardRef(function (props, ref) {
  const {children, contentMaxWidth = 'xl', sectionGap = 'xs', sx = null, ...others} = props
  const getPadding = () => {
    switch (sectionGap) {
      case false || null:
        return 0
      case 'xs':
        return 3
      case 'sm':
        return 6
      case 'md':
        return 9
      case 'lg':
        return 12
      default:
        return 4
    }
  }
  return (
    <Container
      ref={ref}
      component="section"
      maxWidth={false}
      disableGutters
      sx={{py: getPadding(), backgroundColor: 'background.paper', borderBottom: '1px solid black'}}
    >
      <Container maxWidth={contentMaxWidth} {...others}>
        {children}
      </Container>
    </Container>
  )
})

SectionContainer.displayName = 'Section Container'

SectionContainer.propTypes = {
  sectionGap: PropTypes.string,
  contentMaxWidth: PropTypes.string,
}

export default SectionContainer
