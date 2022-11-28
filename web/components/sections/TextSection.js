import {useTheme} from '@emotion/react'
import {Box, Grid, Typography, useMediaQuery} from '@mui/material'
import PropTypes from 'prop-types'
import techtext from 'utils/helpers/techText'
import SectionContainer from '../SectionContainer'
import StyledBlockContent from '../StyledBlockContent'

function TextSection(props) {
  const {sections} = props

  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('md'))

  const stickyProps = {
    position: isSm ? 'relative' : 'sticky',
    top: isSm ? 0 : theme.shape.headerHeight + 8,
  }

  return (
    <SectionContainer maxWidth={false}>
      {sections.map((item, i) => (
        <Grid
          spacing={isSm ? 2 : 4}
          key={item._key}
          container
          sx={{
            p: 2,
            py: 4,
            backgroundColor: theme.palette.background.default,
            flexDirection: item.reversed && !isSm ? 'row-reverse' : 'row',
          }}
        >
          <Grid item xs={12} sm={2}>
            <Box sx={{...stickyProps}}>
              <Typography variant="subtitle1" align={item.reversed ? 'right' : 'left'}>
                {techtext(`${i}_${item.sectionTitle}`)}
              </Typography>
              <StyledBlockContent blocks={item.sectionSummary} />
            </Box>
          </Grid>

          <Grid item xs={12} sm={8} md={8}>
            <StyledBlockContent blocks={item.sectionText} />
          </Grid>

          <Grid
            item
            xs={12}
            sm={8}
            md={2}
            sx={{py: 4, textAlign: 'right !important', ...stickyProps}}
          >
            <Box sx={{...stickyProps}}>
              <StyledBlockContent blocks={item.postText} />
            </Box>
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
