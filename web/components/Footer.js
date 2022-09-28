import {useTheme} from '@emotion/react'
import {Grid, Stack, Typography, useMediaQuery} from '@mui/material'
import {Box} from '@mui/system'
import PropTypes from 'prop-types'
import fireGtag from '../utils/fireGtag'
import Logo from './Logo'
import NavItem from './NavItem'
import SectionContainer from './SectionContainer'
import StyledBlockContent from './StyledBlockContent'

function chunkArray(items, size) {
  if (!items) return null
  const chunks = []
  items = [].concat(...items)
  while (items.length) {
    chunks.push(items.splice(0, size))
  }
  return chunks
}

function Footer(props) {
  const theme = useTheme()

  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const {footerNavigation = [], title, text, logos} = props

  const handleSumbitComplete = () => {
    fireGtag('sign_up', {label: 'footer'})
  }

  const cols = footerNavigation.map((col, i) => (
    <Grid item xs={6} md={3} key={col.columnTitle}>
      <Typography variant="subtitle1" gutterBottom>
        {col.columnTitle}
      </Typography>
      <Box component="nav">
        <Stack direction="column" gap={1}>
          {col.links.map((navItem) => (
            <NavItem key={navItem._key} navItem={navItem} darkText />
          ))}
        </Stack>
      </Box>
    </Grid>
  ))

  return (
    <Box component="footer">
      <SectionContainer sx={{p: 2}}>
        <Stack
          sx={{
            width: '100%',
            flexDirection: isSm ? 'column' : 'row',
            justifyContent: isSm ? 'center' : 'space-between',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <Logo logo={logos['primary']} alt={title} sx={{my: 2}} size="75px" />
        </Stack>

        <Grid container spacing={2} sx={{my: 4}}>
          {cols}
        </Grid>

        <StyledBlockContent blocks={text} />

        <Typography variant="caption" align="left">
          Copyright© {title} {new Date().getFullYear()}{' '}
        </Typography>
      </SectionContainer>
    </Box>
  )
}

Footer.propTypes = {
  navItems: PropTypes.array,
  text: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    asset: PropTypes.shape({
      url: PropTypes.string,
    }),
    logo: PropTypes.string,
  }),
}

export default Footer
