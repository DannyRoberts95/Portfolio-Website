import {CardActionArea, Stack} from '@mui/material'
import imageUrlBuilder from '@sanity/image-url'
import PropTypes from 'prop-types'
import client from '../client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import {Box} from '@mui/system'
import Image from 'next/image'

import {useState} from 'react'
import CategoryChip from './CategoryChip'
import Link from './CustomLink'

import formatDate from '../utils/helpers/formatDate'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

// const formatDate = (date) => {
//   const d = new Date(date)
//   return `${new Date(d).toLocaleString('en-us', {month: 'long', year: 'numeric', day: '2-digit'})}`
// }

const PostCard = (props) => {
  const {post, minimal, sx = {}, ...others} = props

  const [hovered, setHovered] = useState(null)

  const mouseIn = () => setHovered(true)
  const mouseOut = () => setHovered(false)

  if (!post) return null

  const {title = 'Missing title', slug, publishedAt, categories, illustration} = post

  const {href = `/posts/${slug.current}`} = props

  const {image, alt} = illustration

  return (
    <Card
      variant="outlined"
      elevation={0}
      sx={[
        {
          ...sx,
          transition: 'all 0.3s',
          height: '100%',
          border: (theme) => `1px solid ${theme.palette.primary.main}`,
          filter: 'invert(0)',
        },
        hovered && {
          backgroundColor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.primary.contrastText,
          filter: 'invert(1)',
        },
      ]}
      onMouseEnter={mouseIn}
      onMouseLeave={mouseOut}
      {...others}
    >
      <CardActionArea LinkComponent={Link} href={href} sx={{height: '100%'}}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: minimal ? 175 : 250,
            overflow: 'hidden',
          }}
        >
          <Image
            alt={alt}
            quality={minimal ? 50 : 75}
            layout="fill"
            src={urlFor(image).width(400).url()}
            blurDataURL={urlFor(image).width(400).url()}
            placeholder="blur"
            objectFit="cover"
            loading="lazy"
            style={{transition: 'transform 0.5s', transform: hovered ? 'scale(1.1)' : 'scale(1)'}}
          />
        </Box>
        <CardContent sx={{p: 2}}>
          <Typography variant={'overline'}>{formatDate(publishedAt)}</Typography>
          <Typography gutterBottom variant={!minimal ? 'h5' : 'h6'}>
            {title}
          </Typography>
          {!minimal && (
            <Stack direction={'row'} flexWrap="wrap" gap={1} sx={{my: 1}}>
              {categories.map((cat) => (
                <CategoryChip
                  clickable={false}
                  key={cat.title}
                  label={cat.title}
                  sx={{transition: 'all 0.3s'}}
                  categoryColor={cat.color}
                  size="small"
                  color={hovered ? 'secondary' : 'primary'}
                  variant="outlined"
                />
              ))}
            </Stack>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

PostCard.propTypes = {
  post: PropTypes.PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.object,
    publishedAt: PropTypes.string,
    categories: PropTypes.array,
    body: PropTypes.array,
    readTime: PropTypes.number,
  }),
}

export default PostCard
