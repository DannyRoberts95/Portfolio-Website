// [slug].js

import {useTheme} from '@emotion/react'
import {ListAlt} from '@mui/icons-material'
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Fade,
  Grid,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material'
import imageUrlBuilder from '@sanity/image-url'
import Layout from 'components/layouts/Layout'
import PostCard from 'components/PostCard'
import ShareButton from 'components/ShareButton'
import groq from 'groq'
import {NextSeo} from 'next-seo'
import client from '../../../client'

import HeroImage from '../../../components/HeroImage'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const Collection = (props) => {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const {collection, config, navigation} = props

  const {title = 'Missing title', summary = '', categories, illustration, posts} = collection

  const {image, caption, alt} = illustration

  if (!collection) {
    return null
  }

  config.transparentHeader = true

  const authors = []
  posts.forEach((post) => {
    const allNames = authors.map((author) => author.name)
    if (!allNames.includes(post.author.name)) {
      authors.push(post.author)
    }
  })

  return (
    <Layout config={config} navigation={navigation} transparentHeader>
      <NextSeo title={title} titleTemplate={`%s | ${config.title}`} description={summary} />
      {illustration && <HeroImage image={image} caption={caption} alt={alt} />}

      <Container maxWidth={'lg'} sx={{my: 2, overflowX: 'hidden'}}>
        <Card variant="outlined" sx={{mb: 3}}>
          <CardContent>
            <Typography variant="h2" component="h1" sx={{my: 1}}>
              {title}
            </Typography>

            <Stack direction={'row'} gap={1} sx={{my: 2}}>
              {categories.map((cat) => (
                <Chip key={cat} label={cat} size="small" color="primary" variant="outlined" />
              ))}
            </Stack>

            <Typography variant="body1" sx={{maxWidth: 750}}>
              {summary}
            </Typography>

            <Stack direction="row" gap={0.5} sx={{my: 2}}>
              <ListAlt fontSize="small" />
              <Typography variant="body2">
                {posts.length} Post{posts.length > 1 ? 's' : ''} in this collection
              </Typography>
            </Stack>

            <Stack direction={'row'} justifyContent="space-between" sx={{mb: 2}}>
              <Stack>
                <Stack direction="row" alignItems="center">
                  <Box mr={2}>
                    <AvatarGroup max={4}>
                      {authors.map(({image, name}) => (
                        <Tooltip key={name} title={name}>
                          <Avatar
                            src={urlFor(image).format('webp').url()}
                            imgProps={{alt: `${name}-profile-picture`}}
                          />
                        </Tooltip>
                      ))}
                    </AvatarGroup>
                  </Box>
                  <Typography variant="caption">
                    {authors.length} Author{authors.length > 1 ? 's' : ''}
                  </Typography>
                </Stack>
              </Stack>

              <ShareButton exposed={!isSm} />
            </Stack>

            <Divider sx={{my: 2}} />

            <Grid container spacing={2}>
              {posts.map((post) => (
                <Fade key={post.slug.current} in timeout={500}>
                  <Grid item xs={12} sm={4} md={3}>
                    <PostCard
                      post={post}
                      href={`/collections/${collection.slug.current}/${post.slug.current}`}
                      minimal
                    />
                  </Grid>
                </Fade>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  )
}

Collection.getInitialProps = async function (context) {
  const {slug = ''} = context.query
  const collection = await client.fetch(
    groq`*[_type == "collection" && slug.current == $slug][0]{
        ...,
        title,
        summary,
        illustration,
        "categories": categories[]->title,
        "posts":posts[]->{
          ...,
          "categories": categories[]->title,
          "author":{
            "name": author->name,
            "image": author->image.asset,
          },
          illustration
        }
      }`,
    {slug}
  )

  return {
    collection,
  }
}

export default Collection
