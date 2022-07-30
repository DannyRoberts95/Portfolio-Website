import React from 'react'
import PropTypes from 'prop-types'
import {Box, Container} from '@mui/material'
import StyledBlockContent from '../StyledBlockContent'
import SectionTitle from '../SectionTitle'
import SectionContainer from '../SectionContainer'

function TextSection(props) {
  const {sectionTitle, text} = props

  return (
    <SectionContainer sectionGap="sm" maxWidth="lg">
      {sectionTitle && <SectionTitle block={sectionTitle} />}
      {text && <StyledBlockContent blocks={text} />}
    </SectionContainer>
  )
}

TextSection.propTypes = {
  sectionTitle: PropTypes.object,
  text: PropTypes.arrayOf(PropTypes.object),
}

export default TextSection
