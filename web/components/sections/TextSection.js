import {useTheme} from '@emotion/react'
import {Grid, Typography, useMediaQuery} from '@mui/material'
import PropTypes from 'prop-types'
import techtext from 'utils/helpers/techText'
import SectionContainer from '../SectionContainer'
import SectionTitle from '../SectionTitle'
import StyledBlockContent from '../StyledBlockContent'

function TextSection(props) {
  const {sectionTitle, sections} = props

  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <SectionContainer maxWidth={false}>
      {sectionTitle && (
        <SectionTitle
          block={sectionTitle}
          sx={{borderBottom: `1px solid ${theme.palette.primary.contrastText}`}}
        />
      )}
      {sections.map((item) => (
        <Grid
          key={item._key}
          container
          sx={{
            flexDirection: item.reversed && !isSm ? 'row-reverse' : 'row',
            '>*': {
              borderLeft: `1px solid ${theme.palette.primary.main}`,
              borderRight: `1px solid ${theme.palette.primary.main}`,
            },
            '>:last-of-type': {
              borderRight: 'none',
            },
            '>:first-of-type': {
              borderLeft: 'none',
            },
          }}
        >
          <Grid
            item
            xs={12}
            sm={4}
            md={6}
            sx={{
              p: 2,
              // border: `2px solid ${theme.palette.primary.contrastText}`,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
          >
            <Typography
              variant="h3"
              align={item.reversed ? 'right' : 'left'}
              fontStyle={'italic'}
              fontWeight={300}
            >
              {techtext(item.sectionTitle)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={6} sx={{p: 2}}>
            {item.sectionText && <StyledBlockContent blocks={item.sectionText} />}
          </Grid>
        </Grid>
      ))}
    </SectionContainer>
  )
}

TextSection.propTypes = {
  sectionTitle: PropTypes.object,
  text: PropTypes.arrayOf(PropTypes.object),
}

export default TextSection
