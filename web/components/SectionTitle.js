import {useTheme} from '@emotion/react'
import {Box, Container, Paper, Typography} from '@mui/material'
import PropTypes from 'prop-types'

function SectionTitle(props) {
  const theme = useTheme()

  const {block, small, sx, ...others} = props
  const {heading = '', label} = block

  if (!block) return null
  if (!heading || (!heading && !label)) return null

  return (
    <Box
      width="100%"
      sx={[
        {
          py: 1,
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
          borderBottom: `2px solid ${theme.palette.primary.main}`,
          ...sx,
        },
      ]}
      component={Paper}
      elevation={0}
      {...others}
    >
      <Container maxWidth={false}>
        <Typography variant={small ? 'h5' : 'h3'} component={'h2'} fontWeight="700">
          {heading}
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
