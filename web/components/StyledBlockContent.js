import {useTheme} from '@emotion/react'
import {Box, Typography} from '@mui/material'
import {PortableText} from '@portabletext/react'
import PropTypes from 'prop-types'
import {useState} from 'react'
import CustomLink from './CustomLink'
import EmbedHTML from './EmbedHTML'
import EmbedVideo from './EmbedVideo'
import Figure from './Figure'

import Cta from './Cta'
import CustomAccordian from './CustomAccordian'

//https://github.com/portabletext/react-portabletext

function StyledBlockContent(props) {
  const theme = useTheme()

  const markStyles = {
    link: (props) => {
      const {value, children} = props
      return (
        <CustomLink underline="always" href={value?.href || '#'}>
          {children}
        </CustomLink>
      )
    },
  }

  const [blockStyles] = useState({
    //Centered Text Content

    //Normal Text Content
    normal: ({children}) => <Typography variant="body1">{children}</Typography>,
    body1: ({children}) => <Typography variant="body1">{children}</Typography>,
    body2: ({children}) => <Typography variant="body2">{children}</Typography>,
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
    h1: ({children}) => (
      <Typography variant="h1" gutterBottom>
        {children}
      </Typography>
    ),
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
    // console.error('Missing blocks')
    return null
  }

  return (
    <PortableText
      value={blocks}
      components={{
        list: {
          bullet: ({children}) => (
            <Box sx={{px: 2, listStyleType: 'square'}}>
              <Typography variant="body2" component={'ul'}>
                {' '}
                {children}
              </Typography>
            </Box>
          ),
          number: ({children}) => (
            <Box sx={{px: 2}}>
              <Typography variant="body2" component={'ol'}>
                {' '}
                {children}
              </Typography>
            </Box>
          ),
          checkmarks: ({children}) => (
            <Box sx={{px: 2}}>
              <Typography variant="body2" component={'ol'}>
                {' '}
                {children}
              </Typography>
            </Box>
          ),
        },
        block: blockStyles,
        marks: markStyles,
        types: {
          embedHTML: EmbedHTML,
          embedVideo: EmbedVideo,
          figure: Figure,
          accordian: CustomAccordian,
          cta: ({value}) => <Cta sx={{my: 2}} {...value} />,
        },
      }}
    />
  )
}

StyledBlockContent.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.object),
}

export default StyledBlockContent
