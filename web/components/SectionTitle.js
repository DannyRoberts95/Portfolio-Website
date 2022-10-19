import {useTheme} from '@emotion/react'
import {Box, Container, Paper, Typography} from '@mui/material'
import PropTypes from 'prop-types'
import techText from 'utils/helpers/techText'

function SectionTitle(props) {
  const theme = useTheme()

  const {block, small, sticky = true, sx, ...others} = props
  if (!block) return null
  const {heading, label} = block
  if (!heading || (!heading && !label)) return null

  return (
    <Box
      width="100%"
      sx={[
        {
          py: 1,
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
          zIndex: 2,
          borderBottom: `2px solid ${theme.palette.primary.main}`,
          ...sx,
        },
        sticky && {
          position: 'sticky',
          top: theme.shape.headerHeight,
        },
      ]}
      component={Paper}
      elevation={0}
      {...others}
    >
      <Container maxWidth={false}>
        {!small && <Typography variant="overline">{label}</Typography>}
        <Typography variant={small ? 'h5' : 'h3'} component={'h2'} fontWeight="700">
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
