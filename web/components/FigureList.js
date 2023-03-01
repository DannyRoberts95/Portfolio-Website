import {useTheme} from '@emotion/react'
import {ImageList, ImageListItem, useMediaQuery} from '@mui/material'
import {useRouter} from 'next/router'

import Figure from './Figure'

const FigureList = ({value}) => {
  const router = useRouter()
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const {figures = [], sx, ...props} = value

  return (
    <ImageList cols={3} sx={[{width: '100%', my: 2}, sx]} {...props}>
      {figures.map((item) => (
        <ImageListItem key={item._key}>
          <Figure hideCaption value={item} lightBox />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default FigureList
