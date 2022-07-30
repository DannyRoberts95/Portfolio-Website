import React from 'react'
import PropTypes from 'prop-types'
import StyledBlockContent from './StyledBlockContent'
import {Container, Grid, Stack, Typography, useMediaQuery} from '@mui/material'
import {Box} from '@mui/system'
import Logo from './Logo'
import {useTheme} from '@emotion/react'
import MailchimpInput from './MailchimpInput'
import fireGtag from '../utils/fireGtag'
import NavItem from './NavItem'

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

  const {navItems = [], title, text, logos} = props

  const linkColumns = chunkArray(navItems, 5)

  const handleSumbitComplete = () => {
    fireGtag('sign_up', {label: 'footer'})
  }

  const columns = linkColumns?.map((columnLinks, i) => (
    <Grid item xs={6} md={3} key={`column_${i}`}>
      <Box component="nav">
        <Stack direction="column" gap={1}>
          {columnLinks.map((navItem) => (
            <NavItem key={navItem._key} navItem={navItem} darkText />
          ))}
        </Stack>
      </Box>
    </Grid>
  ))

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        borderTop: `2px solid ${theme.palette.primary.main}`,
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          sx={{
            width: '100%',
            flexDirection: isSm ? 'column' : 'row',
            justifyContent: isSm ? 'center' : 'space-between',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <Logo logo={logos['primary']} alt={title} sx={{my: 2}} width="150px" />
          <MailchimpInput handleSumbitComplete={handleSumbitComplete} />
        </Stack>

        <Grid container spacing={2} sx={{my: 4}}>
          {columns}
        </Grid>

        <StyledBlockContent blocks={text} />

        <Typography variant="caption" align="left">
          Copyright© {title} {new Date().getFullYear()}{' '}
        </Typography>
      </Container>
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
