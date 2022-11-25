import {useTheme} from '@emotion/react'
import {Grid, Typography, useMediaQuery} from '@mui/material'
import PropTypes from 'prop-types'
import techtext from 'utils/helpers/techText'
import SectionContainer from '../SectionContainer'
import StyledBlockContent from '../StyledBlockContent'

function TextSection(props) {
  const {sections} = props

  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <SectionContainer maxWidth={false}>
      {sections.map((item) => (
        <Grid
          key={item._key}
          container
          sx={{
            backgroundColor: theme.palette.background.default,
            flexDirection: item.reversed && !isSm ? 'row-reverse' : 'row',
            border: `1px solid ${theme.palette.primary.main}`,
            position: isSm ? 'relative' : 'sticky',
            top: isSm ? 0 : theme.shape.headerHeight,
          }}
        >
          <Grid
            item
            xs={12}
            sm={4}
            md={6}
            sx={[
              {
                p: 2,
                py: 4,
                borderRight: `2px solid ${theme.palette.primary.main}`,
              },
              item.reversed && {
                borderRight: `none`,
                borderLeft: `2px solid ${theme.palette.primary.main}`,
              },
            ]}
          >
            <Typography variant="h5" align={item.reversed ? 'right' : 'left'} fontStyle={'italic'}>
              {techtext(item.sectionTitle)}
            </Typography>
            {item.sectionSummary && <StyledBlockContent blocks={item.sectionSummary} />}
          </Grid>
          <Grid item xs={12} sm={8} md={6} sx={{p: 2, py: 4}}>
            {item.sectionText && <StyledBlockContent blocks={item.sectionText} />}
          </Grid>
        </Grid>
      ))}
    </SectionContainer>
  )
}

TextSection.propTypes = {
  text: PropTypes.arrayOf(PropTypes.object),
}

export default TextSection
