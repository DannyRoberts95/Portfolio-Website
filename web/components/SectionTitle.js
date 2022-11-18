import {useTheme} from '@emotion/react'
import {Box, Paper, Typography} from '@mui/material'
import PropTypes from 'prop-types'
import Marquee from 'react-fast-marquee'

function SectionTitle(props) {
  const theme = useTheme()

  const {block, small, sx, ...others} = props
  const {heading = '', label} = block

  if (!block) return null
  if (!heading || (!heading && !label)) return null

  const component = (
    <Typography variant={small ? 'h5' : 'h3'} component={'h2'} fontWeight="700" sx={{px: 1}}>
      {heading}
    </Typography>
  )

  return (
    <Box
      width="100%"
      sx={[
        {
          py: 1,
          pt: 1.5,
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
      <Marquee gradient={false}>
        {component}
        {component}
        {component}
        {component}
        {component}
        {component}
        {component}
        {component}
        {component}
        {component}
        {component}
      </Marquee>
    </Box>
  )
}

SectionTitle.propTypes = {
  heading: PropTypes.string,
  label: PropTypes.string,
}

export default SectionTitle
