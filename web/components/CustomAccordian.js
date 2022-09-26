import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Typography,
  Container,
  Paper,
  Accordian,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import {useTheme} from '@emotion/react'
import techText from 'utils/helpers/techText'
import StyledBlockContent from './StyledBlockContent'

function CustomAccordian(props) {
  // if (!summary && !content) return null

  // return 'Hello'
  return <Accordian>hi</Accordian>
}

CustomAccordian.propTypes = {
  // value: PropTypes.shape(),
}

export default CustomAccordian
