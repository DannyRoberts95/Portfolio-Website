import {useTheme} from '@emotion/react'
import {Box, Grid, Typography, useMediaQuery} from '@mui/material'
import PropTypes from 'prop-types'
import {useEffect, useRef, useState} from 'react'
import useOnScreen from '../../hooks/useOnScreen'
import StyledBlockContent from '../StyledBlockContent'

import SectionContainer from '../SectionContainer'
import SectionTitle from '../SectionTitle'
function GridSection(props) {
  const theme = useTheme()
  const ref = useRef()
  const isVisible = useOnScreen(ref)
  const isXs = useMediaQuery(theme.breakpoints.down('xs'))
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const {sectionTitle, tiles, size, disableTransition, centered} = props

  const [enter, setEnter] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setEnter(true)
    }
  }, [isVisible])

  const getTileSize = () => {
    const s = size.toLowerCase()
    if (isXs) {
      if (s === 'tiny') return 4
      if (s === 'small') return 6
      if (s === 'medium') return 12
      if (s === 'large') return 12
    } else if (isSm) {
      if (s === 'tiny') return 3
      if (s === 'small') return 6
      if (s === 'medium') return 12
      if (s === 'large') return 12
    } else {
      if (s === 'tiny') return 2
      if (s === 'small') return 3
      if (s === 'medium') return 4
      if (s === 'large') return 6
    }
    return 6
  }

  const getTileSpacing = () => {
    const s = size.toLowerCase()

    if (isXs) {
      if (s === 'tiny') return 0
      if (s === 'small') return 0
      if (s === 'medium') return 1
      if (s === 'large') return 1
    } else if (isSm) {
      if (s === 'tiny') return 1
      if (s === 'small') return 1
      if (s === 'medium') return 2
      if (s === 'large') return 2
    } else {
      if (s === 'tiny') return 2
      if (s === 'small') return 2
      if (s === 'medium') return 2
      if (s === 'large') return 3
    }
    return 2
  }

  return (
    <SectionContainer ref={ref} maxWidth={false}>
      {sectionTitle && <SectionTitle block={sectionTitle} />}

      {tiles && (
        <Grid
          container
          spacing={getTileSpacing()}
          justifyContent={centered ? 'center' : 'flex-start'}
          sx={{
            '>*': {
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
            '>:last-of-type': {
              borderRight: 'none',
            },
            '>:first-of-type': {
              borderLeft: 'none',
            },
          }}
        >
          {tiles.map((tile, i) => {
            const tileContent = (
              <Grid
                item
                xs={getTileSize()}
                key={tile._key}
                sx={{
                  // border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  p: 0,
                }}
              >
                <Box sx={{p: 2}}>
                  <Typography variant="h4" gutterBottom>
                    {tile.heading}
                  </Typography>
                  {tile.tileContent && <StyledBlockContent blocks={tile.tileContent} />}
                </Box>
              </Grid>
            )

            return tileContent
          })}
        </Grid>
      )}
    </SectionContainer>
  )
}

GridSection.propTypes = {
  heading: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.string,
  tiles: PropTypes.arrayOf(PropTypes.object),
}

export default GridSection
