import {useTheme} from '@emotion/react'
import {useMediaQuery} from '@mui/material'

export default function _404(props) {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const {config, navigation} = props

  if (!config || !navigation) return null

  return <>HI</>
}
