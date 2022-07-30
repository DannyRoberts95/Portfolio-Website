import React from 'react'
import PropTypes from 'prop-types'

function EmbedHTML({node}) {
  if (!node) return null
  const {html} = node
  if (!html) {
    return undefined
  }
  return <div dangerouslySetInnerHTML={{__html: html}} />
}

EmbedHTML.propTypes = {
  node: PropTypes.shape({
    html: PropTypes.string,
  }),
}
export default EmbedHTML
