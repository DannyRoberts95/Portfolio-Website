import {useTheme} from '@emotion/react'
import {Box, Chip} from '@mui/material'

const CategoryList = (props) => {
  const {categories, selectedCategory, scrollable = true, handleSelection = () => {}} = props

  const gradient = (
    <Box
      sx={{
        width: '10%',
        height: '100%',
        zIndex: 2,
        position: 'absolute',
        right: 0,
        backgroundImage:
          'linear-gradient(90deg, rgba(255,255,255,0) 0%,  rgba(255,255,255,1) 100%)',
      }}
    />
  )

  return (
    <Box sx={{position: 'relative', width: '100%'}}>
      {/* <Typography gutterBottom variant="body2">
        Topics
      </Typography> */}
      {scrollable && gradient}
      <Box
        sx={[
          {
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
          },
          scrollable && {
            flexWrap: 'nowrap',
            overflowX: 'auto',
            webkitOverflowScrolling: 'touch',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          },
        ]}
      >
        {categories.map((cat) => (
          <Chip
            key={cat.title}
            label={cat.title}
            color="primary"
            variant={selectedCategory === cat.title ? 'contained' : 'outlined'}
            onClick={() => handleSelection(cat.title)}
          />
        ))}
      </Box>
    </Box>
  )
}

export default CategoryList
