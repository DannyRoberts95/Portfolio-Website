import {useTheme} from '@emotion/react'
import {Box, Typography} from '@mui/material'
import PropTypes from 'prop-types'
import Marquee from 'react-fast-marquee'
import techtext from 'utils/helpers/techText'

function SectionTitle(props) {
  const theme = useTheme()

  const {heading: text = '', reverseDirection, sx, ...others} = props

  if (!text) return null

  const component = (
    <Typography variant={'h3'} component={'h2'} fontWeight="700" sx={{px: 1}}>
      {techtext(text)}
    </Typography>
  )

  return (
    <Box
      width="100%"
      sx={[
        {
          py: 1,
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
          borderBottom: `2px solid ${theme.palette.primary.main}`,
          height: 'auto',
          ...sx,
        },
      ]}
      {...others}
    >
      <Marquee gradient={false} direction={reverseDirection ? 'right' : 'left'}>
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
