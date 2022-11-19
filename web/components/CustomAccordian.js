import {useState} from 'react'

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

import {Typography} from '@mui/material'
import {Box} from '@mui/system'
import StyledBlockContent from './StyledBlockContent'

function CustomAccordian({value}) {
  const {content, summary, title, expanded = true} = value

  const [open, setOpen] = useState(expanded)

  return (
    <Accordion
      expanded={open}
      elevation={0}
      onClick={() => setOpen(!open)}
      sx={{
        '::before': {backgroundColor: 'transparent'},
        border: (theme) => `2px solid ${theme.palette.primary.main}`,
        my: 2,
      }}
    >
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
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
