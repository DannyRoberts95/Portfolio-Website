import {useTheme} from '@emotion/react'
import {Box, Fade, Grid, LinearProgress, Typography, useMediaQuery} from '@mui/material'
import CategoryList from 'components/CategoryList'
import Layout from 'components/layouts/Layout'
import PostCard from 'components/PostCard'
import SectionContainer from 'components/SectionContainer'
import SectionTitle from 'components/SectionTitle'
import {NextSeo} from 'next-seo'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'
import {useEffect, useRef, useState} from 'react'
import client from '../../client'
import useOnScreen from '../../hooks/useOnScreen'

const batchNumber = 12

const Posts = (props) => {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const router = useRouter()
  const loadMoreRef = useRef(null)
  const feedEnded = useOnScreen(loadMoreRef)

  const {config, navigation, posts = [], categories} = props
  const [disableRequests, setDisableRequests] = useState(false)
  const {category: selectedCategory = null} = router.query

  const [postList, setPostList] = useState(posts)

  const handleChipClick = (val) => {
    if (selectedCategory === val) {
      router.push('/posts').then(() => getPostByCategory(null))
    } else {
      router.push(`/posts?category=${val}`).then(() => getPostByCategory(val))
    }
  }

  // Fetch the first batch of categorised posts
  const getPostByCategory = async (cat) => {
    const categoricalPosts = await client.fetch(
      `*[${postFiltering} ${cat ? ` && "${cat}" in categories[]->title` : ''}][0...${batchNumber}]{
        ${postQuery}
      }${ordering}
      `
    )
    const allCollectionsRetrieved = categoricalPosts.length < batchNumber
    setDisableRequests(allCollectionsRetrieved)
    setPostList(categoricalPosts)
  }

  // Fetch the next 5 posts and add them to the list
  const loadAdditionalPosts = async () => {
    const startIndex = postList.length
    const endIndex = startIndex + batchNumber
    const additionalPosts = await client.fetch(
      `*[${postFiltering} ${
        selectedCategory ? ` && "${selectedCategory}" in categories[]->title` : ''
      }][${startIndex}...${endIndex}]{
        ${postQuery}
      }${ordering}
      `
    )
    if (additionalPosts.length > 0) {
      setPostList([...postList, ...additionalPosts])
    }
    // check if all posts have been retireved
    if (additionalPosts.length < batchNumber) {
      setDisableRequests(true)
    }
  }

  useEffect(() => {
    if (feedEnded && !disableRequests) {
      loadAdditionalPosts()
    }
  }, [feedEnded])

  useEffect(() => {
    const {category = null} = router.query
    if (category) {
      getPostByCategory()
    }
  }, [router.query.toString()])

  if (!config || !navigation) return null

  return (
    <Layout config={config} navigation={navigation} transparentHeader>
      <NextSeo title={config.title} titleTemplate={`%s | ${config.title}`} />

      <SectionTitle block={{heading: 'Projects', label: router.query?.category || 'Assorted'}} />

      <SectionContainer>
        <CategoryList
          categories={[...categories]}
          selectedCategory={router?.query?.category}
          handleSelection={handleChipClick}
        />
      </SectionContainer>

      <SectionContainer>
        <Grid container>
          <Grid item container spacing={0}>
            {posts.map((post) => (
              <Fade key={post.slug.current} in timeout={500}>
                <Grid item xs={12} sm={6} md={4}>
                  <PostCard post={post} />
                </Grid>
              </Fade>
            ))}

            {/* show the posts */}
            {posts.length === 0 && (
              <Typography variant="caption" align="center" sx={{my: 2, width: '100%'}}>
                Nothing to Display
              </Typography>
            )}

            {/* Get more posts when I enter the users viewPort */}
            <Fade appear ref={loadMoreRef} in={!disableRequests} unmountOnExit>
              <Grid item container>
                <Box sx={{width: '100%'}}>
                  <LinearProgress />
                </Box>
              </Grid>
            </Fade>
          </Grid>
        </Grid>
      </SectionContainer>
    </Layout>
  )
}

Posts.getInitialProps = async function (context) {
  const {category = null} = context?.query

  const posts = await client.fetch(
    `*[${postFiltering}
      ${category ? ` && "${category}" in categories[]->title` : ''}
      ][0...${batchNumber}]{
       ${postQuery}
      } ${ordering}
      `
  )

  const categories = await client.fetch(`*[_type == "category"]{
    ...
  }`)

  return {
    posts,
    categories,
  }
}

export default Posts

const postFiltering = ` _type == "post" && publishedAt < now() && draft != true `

const ordering = `| order(_createdAt asc)`

const postQuery = `
        draft,
        publishedAt,
        categories,
        summary,
        readTime,
        title,
        "categories": categories[]->{
          title,
          color
        },
        "author":{
          "name": author->name,
          "image": author->image.asset,
        },
        illustration,
        slug,`

Posts.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      author: PropTypes.object,
      publishedAt: PropTypes.string,
      categories: PropTypes.array,
      body: PropTypes.array,
      readTime: PropTypes.number,
    })
  ),
}
