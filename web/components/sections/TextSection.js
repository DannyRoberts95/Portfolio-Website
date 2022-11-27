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
      {sections.map((item, i) => (
        <Grid
          spacing={2}
          key={item._key}
          container
          sx={{
            p: 2,
            backgroundColor: theme.palette.background.default,
            flexDirection: item.reversed && !isSm ? 'row-reverse' : 'row',
            borderTop: `1px solid ${theme.palette.primary.main}`,
            borderBottom: `1px solid ${theme.palette.primary.main}`,
            position: isSm ? 'relative' : 'sticky',
            top: isSm ? 0 : theme.shape.headerHeight,
          }}
        >
          <Grid
            item
            xs={12}
            sm={2}
            sx={[
              {
                py: 4,
              },
            ]}
          >
            <Typography variant="h6" align={item.reversed ? 'right' : 'left'}>
              {techtext(`${i}_${item.sectionTitle}`)}
            </Typography>
            <StyledBlockContent blocks={item.sectionSummary} />
          </Grid>
          <Grid item xs={12} sm={8} md={8} sx={{py: 4}}>
            <StyledBlockContent blocks={item.sectionText} />
          </Grid>
          <Grid item xs={12} sm={8} md={2} sx={{py: 4, textAlign: 'right !important'}}>
            <StyledBlockContent blocks={item.postText} />
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
