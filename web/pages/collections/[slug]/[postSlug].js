import groq from 'groq'
import client from '../../../client'

import {ChevronLeft, ChevronRight} from '@mui/icons-material'
import {Button, Container, Divider, Grid, Stack, Typography} from '@mui/material'
import CustomLink from 'components/CustomLink'
import HeroImage from 'components/HeroImage'
import Layout from 'components/layouts/Layout'
import Post from 'components/Post'
import PostCard from 'components/PostCard'
import {NextSeo} from 'next-seo'
import {useRouter} from 'next/router'
import {useEffect} from 'react'

const PostPage = (props) => {
  const router = useRouter()
  const {post, collection, config, navigation} = props

  useEffect(() => {
    if (!post) {
      router.push('/404')
    }
  }, [])

  if (!post) return null

  const {posts: collectionPosts} = collection

  const currentPostIndex = collectionPosts
    .map((collectionPost) => collectionPost.slug.current)
    .indexOf(post.slug.current)
  const previousPost = collectionPosts[currentPostIndex - 1]
  const nextPost = collectionPosts[currentPostIndex + 1]

  const {title = 'Missing title', summary = '', illustration} = post

  const {image, caption, alt} = illustration

  config.transparentHeader = true

  return (
    <Layout config={config} navigation={navigation} transparentHeader>
      <NextSeo title={title} titleTemplate={`%s | ${config.title}`} description={summary} />
      {illustration && <HeroImage image={image} caption={caption} alt={alt} />}
      <Post post={post} />

      <Container maxWidth="lg" sx={{mb: 4, mt: 2}}>
        <Divider sx={{my: 2}} />

        <Typography variant="overline">More in </Typography>
        <Typography variant="subtitle1">{collection.title}</Typography>

        <Stack
          direction={'row'}
          sx={{justifyContent: !previousPost ? 'flex-end' : 'space-between', width: '100%', my: 2}}
        >
          {previousPost && (
            <Button
              size="large"
              startIcon={<ChevronLeft />}
              variant="outlined"
              LinkComponent={CustomLink}
              href={`/collections/${collection.slug.current}/${previousPost.slug.current}`}
            >
              Previous
            </Button>
          )}

          {nextPost && (
            <Button
              size="large"
              endIcon={<ChevronRight />}
              variant="outlined"
              LinkComponent={CustomLink}
              href={`/collections/${collection.slug.current}/${nextPost.slug.current}`}
            >
              Next
            </Button>
          )}
        </Stack>

        <Grid container spacing={2}>
          {collectionPosts.map((post, i) => {
            const isCurrent = i === currentPostIndex
            return (
              <Grid key={post.slug.current} item xs={12} sm={4} md={3}>
                <PostCard
                  post={post}
                  href={
                    isCurrent ? '#' : `/collections/${collection.slug.current}/${post.slug.current}`
                  }
                  minimal
                  elevation={2}
                  sx={[
                    isCurrent && {
                      border: (theme) => `2px solid ${theme.palette.primary.main}`,
                      color: (theme) => theme.palette.primary.main,
                      boxShadow: (theme) => theme.shadows[4],
                    },
                  ]}
                />
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Layout>
  )
}

PostPage.getInitialProps = async function (context) {
  const {postSlug = '', slug = ''} = context.query

  const collection = await client.fetch(
    groq`*[_type == "collection" && slug.current == $slug][0]{
        title,
        slug,
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

  const post = await client.fetch(
    groq`*[_type == "post" && slug.current == $postSlug && publishedAt < now()][0]{
        ...,
        _key,
        "categories": categories[]->title,
        "author":{
          "name": author->name,
          "image": author->image.asset,
        },
        illustration
      }`,
    {postSlug}
  )

  return {
    post,
    collection,
  }
}

export default PostPage
