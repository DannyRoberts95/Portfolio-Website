import {useTheme} from '@emotion/react'
import {Clear} from '@mui/icons-material'
import {Box, Chip, useMediaQuery} from '@mui/material'
import {useRouter} from 'next/router'
import CategoryChip from './CategoryChip'

const CategoryList = (props) => {
  const router = useRouter()
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const {
    categories,
    selectedCategories,
    scrollable = true,
    clearSelection = null,
    handleSelection = () => {},
  } = props

  const gradient = (
    <Box
      sx={{
        width: '10%',
        height: '100%',
        zIndex: 1.1,
        position: 'absolute',
        right: 0,
        backgroundImage:
          'linear-gradient(90deg, rgba(255,255,255,0) 0%,  rgba(255,255,255,1) 100%)',
      }}
    />
  )

  return (
    <Box sx={{position: 'relative', width: '100%'}}>
      {scrollable && gradient}
      <Box
        sx={[
          {
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            p: isSm ? 1 : 2,
          },
          scrollable && {
            flexWrap: 'nowrap',
            overflowX: 'scroll',
            webkitOverflowScrolling: 'touch',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          },
        ]}
      >
        {clearSelection && selectedCategories.length > 0 && (
          <Chip icon={<Clear />} label={'Clear'} size="small" onClick={clearSelection} />
        )}
        {categories
          .sort((a) =>
            router.asPath
              .replace(/[^a-zA-Z ]/g, '')
              .replace(' ', '')
              .includes(a.title.replace(/[^a-zA-Z ]/g, '').replace(' ', ''))
          )
          .map((cat) => (
            <CategoryChip
              categoryColor={cat.color}
              key={cat.title}
              label={cat.title}
              color="primary"
              selected={selectedCategories.includes(cat.title)}
              handleClicked={() => handleSelection(cat.title)}
            />
          ))}
      </Box>
    </Box>
  )
}

export default CategoryList
