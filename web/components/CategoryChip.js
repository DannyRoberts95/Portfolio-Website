import {ClearOutlined, Lens} from '@mui/icons-material'
import {Chip} from '@mui/material'
import {Box} from '@mui/system'
import {useState} from 'react'

export default function CategoryChip({
  label,
  categoryColor,
  sx,
  selected,
  handleClicked = null,
  ...others
}) {
  const [hovered, setHovered] = useState(null)

  const handleMouseEntered = (e) => {
    setHovered(true)
  }
  const handleMouseExited = (e) => {
    setHovered(false)
  }

  const content = (
    <Chip
      onClick={handleClicked}
      onMouseLeave={handleMouseExited}
      onMouseEnter={handleMouseEntered}
      variant={selected ? 'contained' : 'outlined'}
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
            {hovered && selected ? (
              <ClearOutlined htmlColor={categoryColor} fontSize={'inherit'} />
            ) : (
              <Lens htmlColor={categoryColor} fontSize={'inherit'} />
            )}
            {label}
          </Box>
        </>
      }
      size="small"
      color={hovered ? 'secondary' : 'primary'}
      sx={[handleClicked && {cursor: 'pointer'}, sx]}
      {...others}
    />
  )
  return content
}
