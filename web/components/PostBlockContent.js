import {useTheme} from '@emotion/react'
import {Link} from '@mui/icons-material'
import {Grow, IconButton, Stack, Tooltip, Typography, useMediaQuery} from '@mui/material'
import {PortableText} from '@portabletext/react'
import PropTypes from 'prop-types'
import {useState} from 'react'
import CustomLink from './CustomLink'
import EmbedCodeSnippet from './EmbedCodeSnippet'
import EmbedHTML from './EmbedHTML'
import EmbedVideo from './EmbedVideo'
import Figure from './Figure'

import dynamic from 'next/dynamic'
const EmbedEquation = dynamic(() => import('./EmbedEquation'), {
  ssr: false,
})

//https://github.com/portabletext/react-portabletext

const LinkableHeader = (props) => {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const {className = '', children, index, ...others} = props
  const [copied, setCopied] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleEntered = () => {
    setHovered(true)
  }
  const handleLeave = () => {
    setHovered(false)
    setCopied(false)
  }

  // generate the id for targeted linking to this header, must be unique.
  const id = `linked-${index}-${children.join('-').replace(' ', '-')}`

  const handleCopy = () => {
    if (typeof window != undefined) {
      const loc = window.location.origin + window.location.pathname
      navigator.clipboard.writeText(`${loc}#${id}`)
      setCopied(true)
    }
  }

  return (
    <Stack
      direction="row"
      flexWrap={'nowrap'}
      alignItems={'center'}
      gap={1}
      onMouseEnter={handleEntered}
      onMouseLeave={handleLeave}
    >
      <Typography id={id} className={`linked-header ${className}`} gutterBottom {...others}>
        {children}
      </Typography>

      <Grow in={isSm || hovered}>
        <Tooltip title={copied ? 'Link Copied!' : 'Copy to Clipboard'}>
          <IconButton onClick={handleCopy} color="primary">
            <Link fontSize={isSm ? 'small' : 'medium'} color="inherit" />
          </IconButton>
        </Tooltip>
      </Grow>
    </Stack>
  )
}

function PostBlockContent(props) {
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
    h6: ({children, index}) => (
      <LinkableHeader variant="subtitle1" component="h6" index={index} sx={{mt: 2}}>
        {children}
      </LinkableHeader>
    ),
    h5: ({children, index}) => (
      <LinkableHeader variant="h6" component="h5" index={index} sx={{mt: 2}}>
        {children}
      </LinkableHeader>
    ),
    h4: ({children, index}) => (
      <LinkableHeader variant="h5" component="h4" index={index} sx={{mt: 2}}>
        {children}
      </LinkableHeader>
    ),
    h3: ({children, index}) => (
      <LinkableHeader variant="h4" component="h3" index={index} sx={{mt: 2}}>
        {children}
      </LinkableHeader>
    ),
    h2: ({children, index}) => (
      <LinkableHeader variant="h3" component="h2" index={index} sx={{mt: 2}}>
        {children}
      </LinkableHeader>
    ),
    h1: ({children}) => (
      <Typography variant="h2" component="h1" sx={{mt: 2}}>
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
    console.error('Missing blocks')
    return null
  }

  return (
    <PortableText
      value={blocks}
      components={{
        list: {
          bullet: ({children}) => (
            <Typography variant="body1" component={'ul'} sx={{px: 2}}>
              {children}
            </Typography>
          ),
          number: ({children}) => (
            <Typography variant="body1" component={'ol'} sx={{px: 2}}>
              {children}
            </Typography>
          ),
          checkmarks: ({children}) => (
            <Typography variant="body1" component={'ol'} sx={{px: 2}}>
              {children}
            </Typography>
          ),
        },
        block: blockStyles,
        marks: markStyles,
        types: {
          embedHTML: EmbedHTML,
          embedVideo: EmbedVideo,
          figure: (props) => <Figure {...props} lightBox />,
          embedEquation: EmbedEquation,
          embedCodeSnippet: EmbedCodeSnippet,
        },
      }}
    />
  )
}

PostBlockContent.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.object),
}

export default PostBlockContent
