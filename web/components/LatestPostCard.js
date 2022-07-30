import {Avatar, CardActionArea, Chip, Divider, Stack, useMediaQuery} from '@mui/material'
import imageUrlBuilder from '@sanity/image-url'
import PropTypes from 'prop-types'
import client from '../client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import {Box} from '@mui/system'
import Image from 'next/image'

import {useTheme} from '@emotion/react'
import Link from './CustomLink'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const formatDate = (date) => {
  const d = new Date()
  return `${new Date(d).toLocaleString('en-us', {month: 'long', year: 'numeric'})}`
}

const LatestPostCard = (props) => {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const {post} = props

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

  const {image, alt} = illustration

  return (
    <Card elevation={8} sx={{width: '100%', minHeight: 400}}>
      <CardActionArea
        LinkComponent={Link}
        href={`/posts/${slug.current}`}
        sx={[{display: 'flex', height: '100%'}, isSm && {flexDirection: 'column-reverse'}]}
      >
        <CardContent sx={[{flexBasis: '50%', p: 3}, , isSm && {width: '100%', p: 2}]}>
          <Typography gutterBottom variant="overline" color="primary">
            Latest
          </Typography>
          <Typography gutterBottom variant="h4">
            {title}
          </Typography>
          <Stack direction={'row'} flexWrap="wrap" gap={1} sx={{my: 1}}>
            {categories.map((cat) => (
              <Chip key={cat} label={cat} size="small" color="primary" variant="outlined" />
            ))}
          </Stack>

          <Typography gutterBottom variant="body2">
            {summary}
          </Typography>

          <Divider sx={{my: 1}} />
          <Stack direction={'row'} justifyContent="space-between" sx={{mt: 1}}>
            <Stack direction="row" alignItems="center">
              <Box mr={1}>
                <Avatar
                  src={urlFor(author.image).format('webp').url()}
                  sx={{width: 32, height: 32}}
                />
              </Box>
              <Stack>
                <Typography variant="body2">{author.name}</Typography>
                <Typography variant="caption">
                  {formatDate(publishedAt)} {readTime && ` · ${readTime} min read`}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>

        <Box
          sx={[
            {
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              flexBasis: '50%',
            },
            isSm && {minHeight: 150},
          ]}
        >
          <Image
            alt={alt}
            layout="fill"
            quality={100}
            src={urlFor(image).width(400).url()}
            blurDataURL={urlFor(image).url()}
            objectFit="cover"
            priority
          />
        </Box>
      </CardActionArea>
    </Card>
  )
}

LatestPostCard.propTypes = {
  post: PropTypes.PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.object,
    publishedAt: PropTypes.string,
    categories: PropTypes.array,
    body: PropTypes.array,
    readTime: PropTypes.number,
  }),
}

export default LatestPostCard
