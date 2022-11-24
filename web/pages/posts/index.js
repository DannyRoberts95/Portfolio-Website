import {Fade, Grid, Typography} from '@mui/material'
import CategoryList from 'components/CategoryList'
import Layout from 'components/layouts/Layout'
import PostCard from 'components/PostCard'
import SectionContainer from 'components/SectionContainer'
import SectionTitle from 'components/SectionTitle'
import {NextSeo} from 'next-seo'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'
import client from '../../client'

const Posts = (props) => {
  const router = useRouter()
  const [selectedCategories, setSelectedCategories] = useState([])

  const {config, navigation, posts = [], categories} = props

  const handleChipClick = (val) => {
    if (selectedCategories.includes(val)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== val))
    } else {
      setSelectedCategories([...selectedCategories, val])
    }
  }

  useEffect(() => {
    if (router.query.category) setSelectedCategories([router.query.category])
  }, [router.query])

  if (!config || !navigation) return null

  const postsToRender = posts.filter((post) => {
    if (selectedCategories.length === 0) return true
    return selectedCategories.every((cat) => post.categories.map((cat) => cat.title).includes(cat))
  })

  const sortedCategories = categories.sort((a, b) => {
    if (selectedCategories.includes(a.title) && !selectedCategories.includes(b.title)) {
      return -1
    }
    if (selectedCategories.includes(b.title) && !selectedCategories.includes(a.title)) {
      return 1
    }
    return 0
  })

  return (
    <Layout config={config} navigation={navigation} transparentHeader>
      <NextSeo title={config.title} titleTemplate={`%s | ${config.title}`} />

      <SectionTitle block={{heading: 'Projects', label: router.query?.category || 'Assorted'}} />

      <SectionContainer>
        <CategoryList
          categories={sortedCategories}
          selectedCategories={selectedCategories}
          disableNavigation
          handleSelection={handleChipClick}
          clearSelection={() => setSelectedCategories([])}
        />
      </SectionContainer>

      <SectionContainer>
        <Grid container>
          <Grid item container spacing={0}>
            {postsToRender.map((post) => (
              <Fade key={post.slug.current} in timeout={500}>
                <Grid item xs={12} sm={6} md={4}>
                  <PostCard post={post} />
                </Grid>
              </Fade>
            ))}

            {/* show the posts */}
            {postsToRender.length === 0 && (
              <Typography variant="body1" align="center" sx={{my: 12, width: '100%'}}>
                Nothing to Display
              </Typography>
            )}
          </Grid>
        </Grid>
      </SectionContainer>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = await client.fetch(
    `*[${postFiltering}
      ][]{
       ${postQuery}
      } ${ordering}
      `
  )

  const categories = await client.fetch(`*[_type == "category"]`)

  return {
    props: {
      posts,
      categories,
    },
    revalidate: 30,
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
