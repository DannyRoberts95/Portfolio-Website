import {useTheme} from '@emotion/react'
import {Add, Remove, Search} from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import LinkableHeader from 'components/LinkableHeader'
import PropTypes from 'prop-types'
import {useMemo, useState} from 'react'
import SectionContainer from '../SectionContainer'
import SectionTitle from '../SectionTitle'
import StyledBlockContent from '../StyledBlockContent'

function QuestionAccordian({question: {accordian, tags, _key}, selectedTags, ...others}) {
  const {summary, content} = accordian
  const [open, setOpen] = useState(false)
  return (
    <Accordion {...others} elevation={2} expanded={open}>
      <AccordionSummary>
        <Stack direction={'column'}>
          <LinkableHeader
            id={`question-${_key}`}
            className={'question-summary'}
            variant="subtitle1"
          >
            {summary}
          </LinkableHeader>
          {tags && (
            <Stack direction="row" gap={1} sx={{my: 1}}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant={'outlined'}
                  color={selectedTags.includes(tag) ? 'primary' : 'default'}
                />
              ))}
            </Stack>
          )}
          <span>
            <Button onClick={() => setOpen(!open)} endIcon={open ? <Remove /> : <Add />}>
              {open ? 'See Less' : 'See More'}
            </Button>
          </span>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>{content && <StyledBlockContent blocks={content} />}</AccordionDetails>
    </Accordion>
  )
}

function LogSection(props) {
  const theme = useTheme()
  const {sectionTitle, entries, sectionContent} = props

  const [searchTerm, setSearchTerm] = useState(null)
  const [selectedTags, setSelectedTags] = useState([])

  const allTags = [
    ...new Set(
      entries
        .map((q) => q.tags)
        .flat()
        .filter((tag) => Boolean(tag))
    ),
  ]

  const handleSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t != tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
  }

  // Filter entries by user input
  const selectedEntries = useMemo(() => {
    const filteredByCategory = entries.filter((q) => {
      if (selectedTags.length === 0) return true
      return selectedTags.some((selectedTag) => q?.tags?.includes(selectedTag))
    })

    if (!searchTerm) return filteredByCategory

    const term = searchTerm.toLowerCase()
    const filteredBySearchTerm = filteredByCategory.filter((q) => {
      const {
        accordian: {summary},
        tags,
      } = q

      const tagCheck = tags?.some((tag) => tag.toLowerCase().includes(term))
      const nameCheck = summary?.toLowerCase().includes(term)
      return tagCheck || nameCheck
    })

    return filteredBySearchTerm
  }, [selectedTags, searchTerm])

  return (
    <SectionContainer>
      {sectionTitle && <SectionTitle block={sectionTitle} />}

      <Box>{sectionContent && <StyledBlockContent blocks={sectionContent} />}</Box>

      <Divider sx={{my: 2}} />

      <Grid container spacing={2}>
        {/* Search */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder="Search..."
            onChange={handleSearch}
            InputProps={{
              startAdornment: <Search color="action" />,
            }}
          />
        </Grid>
        {/* tags */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              my: 2,
              position: ' -webkit-sticky',
              position: 'sticky',
              top: theme.shape.headerHeight,
              maxHeight: `calc(100vh - ${theme.shape.headerHeight}px)`,
              overflowY: 'scroll',
            }}
          >
            <Stack
              direction={'row'}
              gap={1}
              sx={{
                my: 1,
                display: 'flex',
                gap: 0.5,
                flexWrap: 'wrap',
              }}
            >
              {allTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                  color="primary"
                  onClick={() => handleSelection(tag)}
                  onDelete={selectedTags.includes(tag) ? () => handleSelection(tag) : null}
                />
              ))}
            </Stack>
          </Box>
        </Grid>

        {/* List */}
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            ':target:before': {
              content: '""',
              display: 'block',
              height: '200px',
              margin: '-200px 0 0',
            },
          }}
        >
          {selectedEntries.length === 0 && (
            <Typography variant="body2" color="textSecondary" align="center" sx={{m: 3}}>
              No Results
            </Typography>
          )}

          {selectedEntries.map((q) => (
            <QuestionAccordian question={q} key={q._key} selectedTags={selectedTags} />
          ))}
        </Grid>
      </Grid>
    </SectionContainer>
  )
}

LogSection.propTypes = {
  sectionTitle: PropTypes.object,
  text: PropTypes.arrayOf(PropTypes.object),
}

export default LogSection
