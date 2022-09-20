import React, {useEffect, useState, useRef} from 'react'
import PropTypes from 'prop-types'
import StyledBlockContent from '../StyledBlockContent'
import {Container, useMediaQuery, Typography, Grid, Grow, Box} from '@mui/material'
import {useTheme} from '@emotion/react'
import useOnScreen from '../../hooks/useOnScreen'

import SectionTitle from '../SectionTitle'
import SectionContainer from '../SectionContainer'
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
    <SectionContainer ref={ref}>
      <SectionTitle block={sectionTitle} />
      {tiles && (
        <Grid
          container
          spacing={getTileSpacing()}
          justifyContent={centered ? 'center' : 'flex-start'}
        >
          {tiles.map((tile, i) => {
            const tileContent = (
              <Grid
                item
                xs={getTileSize()}
                key={tile._key}
                sx={{border: (theme) => `1px solid ${theme.palette.primary.main}`}}
              >
                <Box sx={{p: 2}}>
                  <Typography variant="h4" gutterBottom>
                    {tile.heading}
                  </Typography>
                  {tile.tileContent && <StyledBlockContent blocks={tile.tileContent} />}
                </Box>
              </Grid>
            )

            if (disableTransition) {
              return tileContent
            }

            return (
              <Grow in={enter} timeout={Math.min(2500, 500 + i * 500)} key={tile._key}>
                {tileContent}
              </Grow>
            )
          })}
        </Grid>
      )}
      {/* </Container> */}
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
