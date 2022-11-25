import {useTheme} from '@emotion/react'
import {Box, ImageList, ImageListItem, useMediaQuery} from '@mui/material'
import {useRouter} from 'next/router'

import Figure from './Figure'

const FigureList = ({value}) => {
  const router = useRouter()
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const {figures = [], variant = 'standard', cols = 3} = value

  return (
    <Box sx={{position: 'relative', width: '100%', my: 2}}>
      <ImageList cols={cols} rowHeight={45} gap={theme.spacing(1)} variant={variant}>
        {figures.map((item) => (
          <ImageListItem key={item._key} sx={{overflow: 'hidden'}}>
            <Figure value={item} lightBox />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  )
}

export default FigureList
