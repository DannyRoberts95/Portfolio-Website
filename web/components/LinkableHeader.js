import {useTheme} from '@emotion/react'
import {Grow, IconButton, Stack, Tooltip, Typography, useMediaQuery} from '@mui/material'
import {useState} from 'react'

const LinkableHeader = (props) => {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const {className = '', children, index = 0, ...others} = props
  const [copied, setCopied] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleEntered = () => {
    setHovered(true)
  }
  const handleLeave = () => {
    setHovered(false)
    setCopied(false)
  }

  const generateId = () => {
    const childrenIsArray = Array.isArray(children)
    const childString = childrenIsArray ? children.join('-').replace(' ', '-') : children
    const str = `linked-${index}-${childString}`.replace(/[^a-zA-Z-0-9]/g, '')
    return str
  }

  // generate the id for targeted linking to this header, must be unique.
  const id = generateId()

  const handleCopy = () => {
    if (typeof window != undefined) {
      const loc = window.location.origin + window.location.pathname
      navigator.clipboard.writeText(`${loc}#${id}`)
      setCopied(true)
    }
  }

  return (
    <Stack
      id={id}
      direction="row"
      flexWrap={'nowrap'}
      alignItems={'center'}
      gap={1}
      onMouseEnter={handleEntered}
      onMouseLeave={handleLeave}
    >
      <Typography className={`linked-header ${className}`} gutterBottom {...others}>
        {children}
      </Typography>

      <Grow in={isSm || hovered}>
        <Tooltip title={copied ? 'Link Copied!' : 'Copy Link to Clipboard'}>
          <IconButton onClick={handleCopy} color="primary"></IconButton>
        </Tooltip>
      </Grow>
    </Stack>
  )
}
export default LinkableHeader
