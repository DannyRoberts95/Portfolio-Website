import {CardActionArea, Chip, Stack} from '@mui/material'
import imageUrlBuilder from '@sanity/image-url'
import client from '../client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import Image from 'next/image'
import PropTypes from 'prop-types'

import {ListAlt} from '@mui/icons-material'
import Link from './CustomLink'

const minHeight = 325

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const CollectionCard = (props) => {
  const {collection} = props
  if (!collection) return null

  const {title = 'Missing title', slug, categories, summary, illustration, posts} = collection

  const {image, alt} = illustration

  return (
    <Card
      elevation={2}
      sx={{
        position: 'relative',
        color: '#fff',
        minHeight,
      }}
    >
      <Image
        alt={alt}
        layout="fill"
        src={urlFor(image).url()}
        blurDataURL={urlFor(image).url()}
        placeholder="blur"
        objectFit="cover"
        loading="lazy"
      />

      <CardActionArea
        LinkComponent={Link}
        href={`/collections/${slug.current}`}
        sx={{
          minHeight,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          backgroundImage: 'linear-gradient(0deg, rgba(0,0,0,0.75) 0%,rgba(0,0,0,0) 100%)',
        }}
      >
        <CardContent sx={{zIndex: 1, height: '100%', minWidth: '100%'}}>
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          <Stack direction={'row'} flexWrap="wrap" gap={1} sx={{my: 1}}>
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                size="small"
                variant="outlined"
                sx={{color: 'white', borderColor: 'white'}}
              />
            ))}
          </Stack>
          <Typography gutterBottom variant="body2" sx={{mb: 1.5}}>
            {summary}
          </Typography>
          <Stack direction="row" gap={0.5}>
            <ListAlt fontSize="small" />
            <Typography variant="caption">{posts.length} Posts</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

CollectionCard.propTypes = {
  collection: PropTypes.PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.object,
    categories: PropTypes.array,
  }),
}

export default CollectionCard
