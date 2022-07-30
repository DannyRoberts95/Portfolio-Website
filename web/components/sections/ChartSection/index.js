import React, {useState, useMemo} from 'react'
import {Box} from '@mui/system'
import {Button, Container, Fade, TextField, Typography, useMediaQuery} from '@mui/material'
import {useTheme} from '@emotion/react'
import chartData from '../../../utils/consts/chartData'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

import SectionContainer from '../../SectionContainer'
import SectionTitle from '../../SectionTitle'
import CustomTooltip from './CustomTooltip'
import {useEffect} from 'react'

const inputHeight = 50
const timeout = 250
const chartMargin = {
  top: 10,
  left: -16,
  right: 4,
  bottom: 0,
}
const dataKeys = Object.keys(chartData[0]).filter((key) => key != 'date')

const formatValue = (val) => {
  if (val < 1000) return val
  return `${Math.round(val / 1000)}k`
}

const formatDate = (date) => new Date(date).getFullYear()

function buildData(raw, investment) {
  let valStore = {}
  dataKeys.forEach((key) => (valStore[key] = investment))

  const arr = raw.map((dataPoint) => {
    const obj = {...dataPoint}

    dataKeys.forEach((key) => {
      const amount = Math.floor(valStore[key] * (dataPoint[key] + 1), 2)
      const percent = Math.floor((amount / investment) * 100, 2)
      obj[`${key}_percent`] = percent
      obj[`${key}`] = amount
      valStore[key] = amount
    })
    return obj
  })
  return arr
}

export default function ChartSection(props) {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const {initialInvestment, sectionTitle, name = 'An Aikido Strategy'} = props

  const [investment, setInvestment] = useState(initialInvestment)
  const data = useMemo(() => buildData(chartData, investment), [investment])
  const [value, setValue] = useState(initialInvestment)
  const [animateIn, setAnimateIn] = useState(true)

  const colorArray = [
    {c1: theme.palette.primary.main, c2: theme.palette.primary.main},
    {c1: theme.palette.secondary.main, c2: theme.palette.secondary.main},
  ]

  const handleClick = () => {
    if (value !== investment) {
      setAnimateIn(false)
      setTimeout(() => {
        setInvestment(0)
        setTimeout(() => {
          setAnimateIn(true)
          setInvestment(value)
        }, timeout * 4)
      }, timeout)
    }
  }

  const handleChange = (e) => {
    const val = parseFloat(e.target.value)
    const cappedValue = Math.min(val, 1000000)
    setValue(cappedValue)
  }

  const renderAxisTickY = ({x, y, payload}) => {
    return (
      <Fade in={animateIn} timeout={timeout}>
        <Box
          component="text"
          x={x}
          y={y}
          style={{...theme.typography.caption, fontSize: '0.65em', textAnchor: 'right'}}
          textAnchor="end"
        >
          {formatValue(payload.value)}
        </Box>
      </Fade>
    )
  }

  const renderAxisTickX = ({x, y, payload}) => (
    <text
      x={x - 12}
      y={y + 12}
      style={{...theme.typography.caption, fontSize: '0.65em', textAnchor: 'center'}}
    >
      {formatDate(payload.value)}
    </text>
  )

  const buildFillId = (key) => {
    if (!key) return ''
    return key.toString().toLowerCase().replace(/ /g, '') + '_fill'
  }

  useEffect(() => {
    document.body.style.overflowX = 'hidden'
    return () => {
      document.body.style.overflowX = 'auto'
    }
  }, [])

  const gradients = dataKeys.map((key, i) => {
    const obj = colorArray[i]
    return (
      <linearGradient key={key} id={buildFillId(key)} x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor={obj.c1} stopOpacity={1} />
        <stop offset="95%" stopColor={obj.c2} stopOpacity={0.05} />
      </linearGradient>
    )
  })

  return (
    <SectionContainer>
      {/* input container */}
      {sectionTitle && <SectionTitle block={sectionTitle} />}
      <Box
        sx={[
          {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          },
          isSm && {justifyContent: 'center'},
        ]}
      >
        <Box sx={{display: 'flex', minWidth: 300}}>
          <TextField
            id="investmentInput"
            label="Initial Investment"
            name="investmentAmount"
            type="number"
            onChange={handleChange}
            value={value}
            variant="outlined"
            color="primary"
            fullWidth
            InputProps={{
              startAdornment: '$ ',
              sx: [
                {
                  flexBasis: '70%',
                  height: inputHeight,
                  borderRadius: inputHeight / 2,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                },
              ],
            }}
          />
          <Button
            fullWidth
            disableElevation
            onClick={handleClick}
            variant="contained"
            color="primary"
            sx={[
              {
                flexBasis: '30%',
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                height: inputHeight,
              },
            ]}
          >
            GO
          </Button>
        </Box>
      </Box>
      {/* chart container */}
      <Box sx={{height: isSm ? 340 : 390}}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={chartMargin} style={{cursor: 'crosshair'}}>
            <defs>{gradients}</defs>
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid vertical={false} opacity={0.33} />
            <YAxis domain={[0, (dataMax) => dataMax + 1000]} stroke="none" tick={renderAxisTickY} />
            <XAxis
              interval={'preserveStartEnd'}
              dataKey="date"
              stroke="none"
              tick={renderAxisTickX}
            />

            {dataKeys.map((key, i) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colorArray[i].c1}
                fill={`url(#${buildFillId(key)})`}
              />
            ))}

            <Legend
              verticalAlign="top"
              align="right"
              iconType={'circle'}
              iconSize={12}
              height={40}
              wrapperStyle={{right: 0, color: '#f7f7f7 !important'}}
            />
          </AreaChart>
        </ResponsiveContainer>

        <Typography
          sx={{fontSize: 10, m: 2, width: '100%'}}
          variant="caption"
          color="textSecondary"
          align="right"
        >
          Based on backtested returns of {name}. Past performance is not indicative of future
          results. Results are inclusive of fees.
        </Typography>
      </Box>
    </SectionContainer>
  )
}
