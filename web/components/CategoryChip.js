import {Chip} from '@mui/material'
import {Box} from '@mui/system'
import {useState} from 'react'
import Link from './CustomLink'

export default function CategoryChip({label, categoryColor, sx, clickable = true, ...others}) {
  const [hovered, setHovered] = useState(null)

  const handleMouseEntered = (e) => {
    setHovered(true)
  }
  const handleMouseExited = (e) => {
    setHovered(false)
  }

  const content = (
    <Chip
      onMouseLeave={handleMouseExited}
      onMouseEnter={handleMouseEntered}
      label={
        <>
          <Box
            component="span"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <span style={{transform: 'scale(2)'}}>•</span>
            {label}
          </Box>
        </>
      }
      size="small"
      color={hovered ? 'secondary' : 'primary'}
      variant="outlined"
      sx={[clickable && {cursor: 'pointer'}, sx]}
      {...others}
    />
  )

  if (!clickable) return content

  return (
    <Link href={`/posts?category=${label}`} underline="none">
      {content}
    </Link>
  )
}
