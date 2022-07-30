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

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const formatDate = (date) => {
  const d = new Date(date)
  return `${new Date(d).toLocaleString('en-us', {month: 'long', year: 'numeric', day: '2-digit'})}`
}

const PostCard = (props) => {
  const {post, minimal, ...others} = props

  if (!post) return null

  const {
    title = 'Missing title',
    author = null,
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
    <Card elevation={0} sx={{border: '1px solid balck'}} {...others}>
      <CardActionArea LinkComponent={Link} href={href}>
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
        <CardContent>
          <Typography gutterBottom variant={!minimal ? 'h5' : 'subtitle2'}>
            {title}
          </Typography>
          {!minimal && (
            <Stack direction={'row'} flexWrap="wrap" gap={1} sx={{my: 1}}>
              {categories.map((cat) => (
                <Chip key={cat} label={cat} size="small" color="primary" variant="outlined" />
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
                {!minimal && <Typography variant="body2">{author.name}</Typography>}
                <Typography variant="caption">
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
