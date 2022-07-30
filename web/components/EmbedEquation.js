import {Box} from '@mui/material'
import {MathComponent} from 'mathjax-react'

export default function EmbedEquation(props) {
  const {markdown, caption = null} = props.value

  if (!markdown) {
    console.warn('No markdown found for embeded equation.')
    return null
  }

  const tex = String.raw`${markdown}`

  return (
    <Box sx={{fontSize: '1.5rem', p: 2}}>
      <MathComponent tex={tex} />
    </Box>
  )
}
