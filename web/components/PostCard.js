import {Avatar, CardActionArea, Chip, Divider, Stack} from '@mui/material'
import imageUrlBuilder from '@sanity/image-url'
import PropTypes from 'prop-types'
import client from '../client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import {Box} from '@mui/system'
import Image from 'next/image'

import Link from './CustomLink'
import {useState} from 'react'

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

  const {
    title = 'Missing title',
    slug,
    publishedAt,
    categories,
    readTime,
    summary,
    illustration,
  } = post

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
        },
        hovered && {
          backgroundColor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.primary.contrastText,
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
            height: minimal ? 100 : 150,
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
          />
        </Box>
        <CardContent sx={{p: 2}}>
          <Typography gutterBottom variant={!minimal ? 'h5' : 'subtitle2'}>
            {title}
          </Typography>
          {!minimal && (
            <Stack direction={'row'} flexWrap="wrap" gap={1} sx={{my: 1}}>
              {categories.map((cat) => (
                <Chip
                  key={cat}
                  label={cat}
                  sx={{transition: 'all 0.3s'}}
                  size="small"
                  color={hovered ? 'secondary' : 'primary'}
                  variant="outlined"
                />
              ))}
            </Stack>
          )}
          {!minimal && (
            <Box sx={{display: {sm: 'none', md: 'block'}}}>
              <Typography gutterBottom variant="body2">
                {summary}
              </Typography>
              <Divider sx={{my: 1}} />
            </Box>
          )}

          <Stack direction={'row'} justifyContent="space-between" sx={{mt: 1}}>
            <Stack direction="row" alignItems="center">
              <Stack>
                <Typography variant="overline">
                  {formatDate(publishedAt)} {readTime && ` · ${readTime} min read`}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
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
