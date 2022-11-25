import {useTheme} from '@emotion/react'
import {Grid, useMediaQuery} from '@mui/material'
import PropTypes from 'prop-types'
import {useRef} from 'react'
import StyledBlockContent from '../StyledBlockContent'

import Marquee from 'react-fast-marquee'
import SectionContainer from '../SectionContainer'
function GridSection(props) {
  const theme = useTheme()
  const ref = useRef()
  const isXs = useMediaQuery(theme.breakpoints.down('xs'))
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const {tiles, size, carousel, reverseCarousel, centered} = props

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

  const content = (
    <SectionContainer
      ref={ref}
      maxWidth={false}
      sx={{
        maxWidth: '100vw',
      }}
    >
      <Grid
        container
        justifyContent={centered ? 'center' : 'flex-start'}
        sx={[
          {
            maxWidth: '100%',
            '>*': {
              borderLeft: (theme) => `1px solid ${theme.palette.primary.main}`,
              borderRight: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
          },
          !carousel && {
            '>:last-of-type': {
              borderRight: 'none',
            },
            '>:first-of-type': {
              borderLeft: 'none',
            },
          },
        ]}
      >
        {tiles.map((tile) => (
          <Grid
            item
            xs={getTileSize()}
            key={tile._key}
            sx={{
              boxSizing: 'border-box',
              p: 2,
            }}
          >
            <StyledBlockContent blocks={tile.tileContent} />
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  )

  if (!carousel) return content

  return (
    <Marquee gradient={false} pauseOnHover direction={reverseCarousel ? 'right' : 'left'}>
      {content}
    </Marquee>
  )
}

GridSection.propTypes = {
  heading: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.string,
  tiles: PropTypes.arrayOf(PropTypes.object),
}

export default GridSection
