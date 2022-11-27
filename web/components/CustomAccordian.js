import {useState} from 'react'

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

import {Add, ExpandLess} from '@mui/icons-material'
import {Divider, Typography} from '@mui/material'
import {Box} from '@mui/system'
import StyledBlockContent from './StyledBlockContent'

function CustomAccordian({value}) {
  const {content, summary, title, expanded = false} = value

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
      <AccordionSummary
        aria-controls={`${title}-summary`}
        id={`${title}-summary`}
        expandIcon={open ? <ExpandLess /> : <Add />}
      >
        <Box>
          <Typography variant="h6">{title}</Typography>
          <StyledBlockContent blocks={summary} />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Divider sx={{mb: 1}} />
        <StyledBlockContent blocks={content} />
      </AccordionDetails>
    </Accordion>
  )
}

CustomAccordian.propTypes = {
  // value: PropTypes.shape(),
}

export default CustomAccordian
