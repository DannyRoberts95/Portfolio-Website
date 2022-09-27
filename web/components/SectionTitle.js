import {useTheme} from '@emotion/react'
import {Box, Container, Paper, Typography} from '@mui/material'
import PropTypes from 'prop-types'
import techText from 'utils/helpers/techText'

function SectionTitle(props) {
  const theme = useTheme()

  const {block, small, sx, ...others} = props
  if (!block) return null
  const {heading, label} = block
  if (!heading || (!heading && !label)) return null

  return (
    <Box
      width="100%"
      sx={[
        {
          py: 1,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          zIndex: 2,
          ...sx,
        },
      ]}
      component={Paper}
      elevation={2}
    >
      <Container maxWidth={false}>
        {!small && <Typography variant="overline">{label}</Typography>}
        <Typography variant={small ? 'h5' : 'h3'} component={'h2'}>
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
