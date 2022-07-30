import {ContentCopy, FacebookOutlined, Reddit, ShareOutlined, Twitter} from '@mui/icons-material'
import {IconButton, Stack, Tooltip} from '@mui/material'

import {useEffect, useRef, useState} from 'react'
import {FacebookShareButton, RedditShareButton, TwitterShareButton} from 'react-share'
import DropdownMenu from './DropdownMenu'

import PropTypes from 'prop-types'

const CopyButton = (props) => {
  const {url} = props
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    if (url) {
      navigator.clipboard.writeText(url)
      setCopied(true)
    }
  }
  return (
    <Tooltip title={copied ? 'Link Copied!' : 'Share Link'}>
      <ContentCopy
        sx={{cursor: 'pointer'}}
        fontSize="small"
        htmlColor="black"
        onClick={handleCopy}
        {...props}
      />
    </Tooltip>
  )
}

export default function ShareButton(props) {
  const {url = null, tags = [], exposed = true, ...others} = props
  const anchorEle = useRef(null)
  const [open, setOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState(url)

  const handleClick = () => setOpen(!open)

  const hashtags = ['aikido', ...tags]

  useEffect(() => {
    setShareUrl(window.location)
  }, [])

  const buttonProps = {url: shareUrl, hashtags}

  const buttons = (
    <Stack direction="row" columnGap={1} alignItems="center" sx={{px: 1}}>
      <TwitterShareButton {...buttonProps}>
        <Twitter color="action" />
      </TwitterShareButton>
      <FacebookShareButton {...buttonProps}>
        <FacebookOutlined color="action" />
      </FacebookShareButton>
      {/* <WhatsappShareButton {...buttonProps}>
        <WhatsApp color="action" />
      </WhatsappShareButton> */}
      <RedditShareButton {...buttonProps}>
        <Reddit color="action" />
      </RedditShareButton>
      {/* <EmailShareButton {...buttonProps}>
        <Email color="action" />
      </EmailShareButton> */}
      <CopyButton url={shareUrl} color="action" />
    </Stack>
  )

  if (exposed) return buttons

  return (
    <>
      <IconButton ref={anchorEle} onClick={handleClick} {...others}>
        <ShareOutlined color="primary" />
      </IconButton>
      <DropdownMenu
        open={open}
        handleClose={handleClick}
        anchorElement={anchorEle}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        transformOrigin={{vertical: 'top', horizontal: 'center'}}
      >
        {buttons}
      </DropdownMenu>
    </>
  )
}

ShareButton.propTypes = {
  url: PropTypes.string,
  tags: PropTypes.array,
}
