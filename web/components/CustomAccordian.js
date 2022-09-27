import React, {useState} from 'react'
import PropTypes from 'prop-types'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

import {useTheme} from '@emotion/react'
import techText from 'utils/helpers/techText'
import StyledBlockContent from './StyledBlockContent'
import {Typography} from '@mui/material'
import {Add, ExpandMore, ExpandLess} from '@mui/icons-material'
import {Box} from '@mui/system'
import theme from 'themes/theme'

function CustomAccordian({value}) {
  const {content, summary, title} = value

  const [open, setOpen] = useState(null)

  return (
    <Accordion
      expanded={open}
      elevation={0}
      onClick={() => setOpen(!open)}
      sx={{
        '::before': {backgroundColor: 'transparent'},
        borderLeft: (theme) => `2px solid ${theme.palette.primary.main}`,
        my: 2,
      }}
    >
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        expandIcon={open ? <ExpandLess /> : <Add />}
      >
        <Box>
          <Typography variant="h6">{title}</Typography>
          <StyledBlockContent blocks={summary} />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <StyledBlockContent blocks={content} />
      </AccordionDetails>
    </Accordion>
  )
}

CustomAccordian.propTypes = {
  // value: PropTypes.shape(),
}

export default CustomAccordian
