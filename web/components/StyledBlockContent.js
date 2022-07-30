import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {PortableText} from '@portabletext/react'
import Figure from './Figure'
import EmbedVideo from './EmbedVideo'
import EmbedHTML from './EmbedHTML'
import {Box, Typography} from '@mui/material'
import {useTheme} from '@emotion/react'
import CustomLink from './CustomLink'

//https://github.com/portabletext/react-portabletext

function StyledBlockContent(props) {
  const theme = useTheme()

  const markStyles = {
    link: (props) => {
      const {value, children} = props
      return (
        <CustomLink underline="hover" href={value?.href || '#'}>
          {children}
        </CustomLink>
      )
    },
  }

  const [blockStyles] = useState({
    //Centered Text Content
    'body1-centered': ({children}) => (
      <Typography variant="body1" align="center" gutterBottom>
        {children}
      </Typography>
    ),
    'body2-centered': ({children}) => (
      <Typography variant="body2" align="center" gutterBottom>
        {children}
      </Typography>
    ),
    'h6-centered': ({children}) => (
      <Typography variant="h6" align="center" gutterBottom>
        {children}
      </Typography>
    ),
    'h5-centered': ({children}) => (
      <Typography variant="h5" align="center" gutterBottom>
        {children}
      </Typography>
    ),
    'h4-centered': ({children}) => (
      <Typography variant="h4" align="center" gutterBottom>
        {children}
      </Typography>
    ),
    'h3-centered': ({children}) => (
      <Typography variant="h3" align="center" gutterBottom>
        {children}
      </Typography>
    ),
    'h2-centered': ({children}) => (
      <Typography variant="h2" align="center" gutterBottom>
        {children}
      </Typography>
    ),
    //Normal Text Content
    normal: ({children}) => (
      <Typography variant="body1" gutterBottom>
        {children}
      </Typography>
    ),
    body1: ({children}) => (
      <Typography variant="body1" gutterBottom>
        {children}
      </Typography>
    ),
    body2: ({children}) => (
      <Typography variant="body2" gutterBottom>
        {children}
      </Typography>
    ),
    h6: ({children}) => (
      <Typography variant="h6" gutterBottom>
        {children}
      </Typography>
    ),
    h5: ({children}) => (
      <Typography variant="h5" gutterBottom>
        {children}
      </Typography>
    ),
    h4: ({children}) => (
      <Typography variant="h4" gutterBottom>
        {children}
      </Typography>
    ),
    h3: ({children}) => (
      <Typography variant="h3" gutterBottom>
        {children}
      </Typography>
    ),
    h2: ({children}) => (
      <Typography variant="h2" gutterBottom>
        {children}
      </Typography>
    ),
    h1: ({children}) => <Typography variant="h1">{children}</Typography>,
    blockquote: ({children}) => (
      <Typography
        variant="subtitle1"
        lineHeight={1.75}
        sx={{pl: 2, my: 1, borderLeft: `3px solid ${theme.palette.primary.main}`}}
      >
        <i>{children}</i>
      </Typography>
    ),
    caption: ({children}) => (
      <Typography variant="caption" gutterBottom>
        {children}
      </Typography>
    ),
  })

  const {blocks} = props

  if (!blocks) {
    console.error('Missing blocks')
    return null
  }

  return (
    <PortableText
      value={blocks}
      components={{
        list: {
          bullet: ({children}) => (
            <Box component={'ul'} sx={{px: 2}}>
              {children}
            </Box>
          ),
          number: ({children}) => (
            <Box component={'ol'} sx={{px: 2}}>
              {children}
            </Box>
          ),
          checkmarks: ({children}) => (
            <Box component={'ol'} sx={{px: 2}}>
              {children}
            </Box>
          ),
        },
        block: blockStyles,
        marks: markStyles,
        types: {
          embedHTML: EmbedHTML,
          embedVideo: EmbedVideo,
          figure: Figure,
        },
      }}
    />
  )
}

StyledBlockContent.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.object),
}

export default StyledBlockContent
