import React from 'react'
import PropTypes from 'prop-types'
import {Box, Typography} from '@mui/material'

function SectionTitle(props) {
  const {block} = props
  if (!block) return null
  const {heading, label, centered = false} = block
  if (!heading && !label) return null

  return (
    <Box sx={[{px: 0, pt: 4, pb: 2}]}>
      <Box sx={{width: '100%', boxSizing: 'border-box'}}>
        {label && (
          <Typography
            variant="overline"
            color="primary"
            component="h2"
            align={centered ? 'center' : 'left'}
            sx={{mt: 1, textTransform: 'capitalize'}}
          >
            {label}
          </Typography>
        )}
        {heading && (
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            align={centered ? 'center' : 'left'}
            sx={{textTransform: 'capitalize'}}
          >
            {heading}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

SectionTitle.propTypes = {
  heading: PropTypes.string,
  label: PropTypes.string,
}

export default SectionTitle
