import React from 'react'
import PropTypes from 'prop-types'
import {Box, Typography, Container, Paper} from '@mui/material'
import {useTheme} from '@emotion/react'
import techText from 'utils/helpers/techText'

function SectionTitle(props) {
  const theme = useTheme()

  const {block, sx} = props
  if (!block) return null
  const {heading, label} = block
  if (!heading && !label) return null

  return (
    <Box
      width="100%"
      sx={{
        position: 'sticky',
        top: theme.shape.headerHeight,
        py: 1,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        zIndex: 2,
      }}
      component={Paper}
      elevation={4}
    >
      <Container maxWidth={false}>
        <Typography variant="overline">{label}</Typography>
        <Typography variant="h3" component={'h2'} letterSpacing={-1}>
          {techText(heading)}
        </Typography>
      </Container>
    </Box>
  )
}

SectionTitle.propTypes = {
  heading: PropTypes.string,
  label: PropTypes.string,
}

export default SectionTitle
