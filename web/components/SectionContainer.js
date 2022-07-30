import {Container} from '@mui/material'
import React, {forwardRef} from 'react'

import PropTypes from 'prop-types'

const SectionContainer = forwardRef(function (props, ref) {
  const {children, contentMaxWidth = 'lg', sectionGap = 'sm', ...others} = props
  const getPadding = () => {
    switch (sectionGap) {
      case false || null:
        return 0
      case 'sm':
        return 3
      case 'md':
        return 6
      case 'lg':
        return 9
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
      sx={{py: getPadding(), backgroundColor: 'background.paper'}}
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
