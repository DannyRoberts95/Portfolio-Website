// CUSTOM TOOLTIP
import React from 'react'
import {Box} from '@mui/system'
import {Paper, Stack, Typography} from '@mui/material'

const formatDate = (date) => new Date(date).getFullYear()

export default function CustomTooltip(props) {
  const {active, payload, label} = props
  const percentValue = (value) => {
    if (!value || typeof value === 'NaN') {
      return ''
    }
    const val = value - 100
    const isNegative = val < 0
    return (
      <Typography variant="caption" color={isNegative ? 'error.main' : 'success.main'}>
        {`${isNegative ? '' : '+'}${val}%` || ''}
      </Typography>
    )
  }

  if (active && payload) {
    return (
      <Box sx={{p: 2, textAlign: 'left'}} component={Paper} elevation={12}>
        <Stack gap={1}>
          <Typography variant="caption" color="textSecondary">
            {formatDate(new Date(label))}
          </Typography>
          {payload.map((item) => (
            <Stack key={item.dataKey} direction={'row'} alignItems="center" gap={1}>
              <Box>
                <Typography variant="body1" color="text" sx={{lineHeight: 1}}>
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-block',
                      transform: 'scale(3)',
                      color: item.color,
                      mr: 1,
                    }}
                  >
                    •
                  </Box>{' '}
                  <span>{` $${
                    item?.payload?.[item.dataKey]
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',') || ''
                  }`}</span>
                </Typography>
                {percentValue(item.payload[`${item.dataKey}_percent`])}
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>
    )
  }
  return null
}
