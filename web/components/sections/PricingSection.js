import React, {forwardRef} from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'

import {
  Typography,
  Grid,
  Grow,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Chip,
  Divider,
} from '@mui/material'
import {Box} from '@mui/system'

import Cta from '../Cta'
import SectionTitle from '../SectionTitle'
import client from '../../client'
import {Lens} from '@mui/icons-material'
import SectionContainer from '../SectionContainer'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const PriceCard = forwardRef((props, ref) => {
  const {plan, ...others} = props

  const headerStyles = {
    align: 'center',
    color: '#fff',
    textShadow: ' 0 2px 2px rgba(0, 0, 0, 0.33)',
    zIndex: 1,
  }

  return (
    <Grid ref={ref} item xs={12} sm={6} md={4} {...others}>
      <Card elevation={plan.primary ? 6 : 2} sx={{position: 'relative'}}>
        <CardHeader
          title={plan.name}
          subheader={plan.header}
          titleTypographyProps={{
            sx: headerStyles,
            fontWeight: (theme) => theme.typography.fontWeightBold,
          }}
          subheaderTypographyProps={{sx: headerStyles}}
          sx={{
            position: 'relative',
            color: '#fff',
            backgroundColor: (theme) => theme.palette.primary.main,
            backgroundImage: `url(${urlFor(plan.backgroundImage)
              .width(500)
              .format('webp')
              .invert()
              .quality(80)
              .url()})`,
            backgroundPosition: 'cover',

            '&::before': {
              content: "''",
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundImage:
                'linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 50%,   rgba(0,0,0,0.2) 100%)',
              width: '100%',
              height: '100%',
              zIndex: 0,
            },
          }}
        />
        <CardContent sx={{px: 3, pt: 2}}>
          {plan.offerTag && (
            <Grow in timeout={1000}>
              <Chip
                size="small"
                label={plan.offerTag}
                color="primary"
                sx={{
                  boxShadow: (theme) => theme.shadows[2],
                  mb: 0.5,
                }}
              />
            </Grow>
          )}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
            }}
          >
            <Typography component="h2" variant="h3" color="text.primary">
              {plan.monthlyPrice || 'Free'}
            </Typography>
            {plan.monthlyPrice && (
              <Typography variant="body2" color="text.secondary">
                Monthly
              </Typography>
            )}
          </Box>
          {plan.annualPrice && (
            <Typography variant="caption" color="text.secondary">
              {plan.annualPrice} Annually
            </Typography>
          )}
          <Divider sx={{my: 1}} />
          {plan.benifits?.map((benifit) => (
            <Box key={benifit} sx={{display: 'flex', alignItems: 'flex-start', mb: 1.5}}>
              <Lens color="primary" fontSize={'6px'} sx={{mr: 0.5, mt: 0.5}} />{' '}
              <Typography>{benifit}</Typography>
            </Box>
          ))}
          <Divider />
        </CardContent>
        <CardActions sx={{display: 'flex', justifyContent: 'center', p: 2}}>
          <Cta {...plan.cta} fullWidth />
        </CardActions>
      </Card>
    </Grid>
  )
})
PriceCard.displayName = 'Price Card'

function PricingSection(props) {
  const {sectionTitle, plans} = props
  return (
    <SectionContainer>
      {sectionTitle && <SectionTitle block={sectionTitle} />}
      <Grid container spacing={3} justifyContent={'center'}>
        {plans.map((plan) => (
          <PriceCard plan={plan} key={plan.name} />
        ))}
      </Grid>
    </SectionContainer>
  )
}

PricingSection.propTypes = {
  sectionTitle: PropTypes.object,
  plans: PropTypes.arrayOf(PropTypes.object),
}

export default PricingSection
