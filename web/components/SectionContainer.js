import {Container} from '@mui/material'
import React, {forwardRef} from 'react'

import PropTypes from 'prop-types'

const SectionContainer = forwardRef(function (props, ref) {
  const {children, contentMaxWidth = 'xl', sectionGap = null, sx = null, ...others} = props

  const getPadding = () => {
    switch (sectionGap) {
      case false || null:
        return 'none'
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
      sx={{
        py: getPadding(),
        backgroundColor: 'background.paper',
        borderTop: (theme) => `1px solid ${theme.palette.primary.main}`,
        borderBottom: (theme) => `1px solid ${theme.palette.primary.main}`,
      }}
    >
      <Container disableGutters maxWidth={contentMaxWidth} {...others} sx={{...sx}}>
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
