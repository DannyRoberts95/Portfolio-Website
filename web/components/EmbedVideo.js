import React from 'react'
import PropTypes from 'prop-types'
import {Box} from '@mui/material'
import ReactPlayer from 'react-player'

function EmbedVideo(props) {
  const {
    value: {url, _key: key},
  } = props

  if (!url) {
    return undefined
  }

  return (
    <Box
      id={`videoEmbed_${key}_container`}
      sx={{
        display: 'block',
        width: '100%',
        maxInlineSize: ' 100%',
        blockSize: 'auto',
        aspectRatio: '16/9',
        my: 2,
      }}
    >
      <ReactPlayer url={url} id={`videoEmbed_${key}`} width="100%" height="100%" muted controls />
    </Box>
  )
}

EmbedVideo.propTypes = {
  node: PropTypes.shape({
    html: PropTypes.string,
  }),
}
export default EmbedVideo
