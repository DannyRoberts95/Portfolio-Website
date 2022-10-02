import {ExpandMore} from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItemButton,
  ListSubheader,
  Stack,
  Typography,
} from '@mui/material'

const TableOfContents = (props) => {
  const {
    header = 'Table of Contents',
    elementList = [],
    onClick = null,
    accordian = false,
    ...others
  } = props

  const handleScroll = (id) => {
    if (id) {
      const section = document.getElementById(id)
      Boolean(section) && section.scrollIntoView({behavior: 'smooth', block: 'center'})
    }
  }

  const handleClicked = (id) => {
    handleScroll(id)
    onClick && onClick(id)
  }

  const ele = (
    <Box component="nav" id="table_of_contents" {...(!accordian && others)}>
      <List disablePadding>
        {!accordian && <ListSubheader sx={{lineHeight: 1.5, mb: 1}}>{header}</ListSubheader>}
        {[...elementList].map((header) => (
          <ListItemButton
            key={header.id + header.innerHTML}
            onClick={() => handleClicked(header.id)}
          >
            <Typography variant="body2">{header.innerText}</Typography>
          </ListItemButton>
        ))}
      </List>
    </Box>
  )

  if (accordian) {
    return (
      <Accordion elevation={0} variant="outlined" {...(accordian && others)}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls={`${header}-content`}
          id={`${header}-title`}
        >
          <Stack>
            <Typography variant="caption" color="textSecondary">
              Tabel of Contents
            </Typography>
            <Typography variant="body1">{header}</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>{ele}</AccordionDetails>
      </Accordion>
    )
  }

  return ele
}

export default TableOfContents
