import {useTheme} from '@emotion/react'
import {Box, Typography} from '@mui/material'
import PropTypes from 'prop-types'
import {useState} from 'react'
import Marquee from 'react-fast-marquee'
import techtext from 'utils/helpers/techText'

function SectionTitle(props) {
  const theme = useTheme()
  const {heading: text = '', reverseDirection, sx, ...others} = props

  const [hovered, sethovered] = useState(false)
  const [parsedText] = useState(techtext(text))

  const handleEnter = () => sethovered(true)
  const handleExit = () => sethovered(false)

  const component = (
    <Typography
      variant={'h3'}
      component={'h2'}
      fontWeight="700"
      sx={{px: 1, pt: 0.5, lineHeight: 1}}
    >
      {parsedText}
    </Typography>
  )

  return (
    <Box
      width="100%"
      onMouseEnter={handleEnter}
      onMouseLeave={handleExit}
      sx={[
        {
          position: 'relative',
          py: 1,
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
          borderBottom: `2px solid ${theme.palette.primary.main}`,
        },
        sx && {
          ...sx,
        },
      ]}
      {...others}
    >
      <Marquee
        gradient={false}
        direction={reverseDirection ? 'right' : 'left'}
        style={{overflowY: 'hidden'}}
      >
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
