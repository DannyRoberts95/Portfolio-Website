import {CircularProgress, Divider, Fade, Grid, Typography} from '@mui/material'
import CategoryList from 'components/CategoryList'
import CollectionCard from 'components/CollectionCard'
import Layout from 'components/layouts/Layout'
import SectionContainer from 'components/SectionContainer'
import {NextSeo} from 'next-seo'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'
import {useEffect, useRef, useState} from 'react'
import client from '../../client'
import useOnScreen from '../../hooks/useOnScreen'

const batchNumber = 12

const Collections = (props) => {
  const router = useRouter()
  const loadMoreRef = useRef(null)
  const feedEnded = useOnScreen(loadMoreRef)

  const {config, navigation, collections = [], categories} = props

  const {category: selectedCategory = null} = router.query

  const [collectionList, setCollectionList] = useState(collections)
  const [disableRequests, setDisableRequests] = useState(collections.length <= batchNumber)

  const handleChipClick = (val) => {
    if (selectedCategory === val) {
      router.push('/collections').then(() => getCollectionByCategory(null))
    } else {
      router.push(`/collections?category=${val}`).then(() => getCollectionByCategory(val))
    }
  }

  //Fetch the first batch of categorised collections
  const getCollectionByCategory = async (cat) => {
    const categoricalCollections = await client.fetch(
      `*[ ${filtering} ${cat ? ` && "${cat}" in categories[]->title` : ''}][0...${batchNumber}]{
        ${collectionQuery}
      }${ordering}
      `
    )
    const allPostsRetrieved = categoricalCollections.length < batchNumber
    setDisableRequests(allPostsRetrieved)
    setCollectionList(categoricalCollections)
  }

  //Fetch the next 5 collections and add them to the list
  const loadAdditionalCollections = async () => {
    const startIndex = collectionList.length
    const endIndex = startIndex + batchNumber
    const additionalCollections = await client.fetch(
      `*[${filtering} ${
        selectedCategory ? ` && "${selectedCategory}" in categories[]->title` : ''
      }][${startIndex}...${endIndex}]{
        ${collectionQuery}
      }${ordering}
      `
    )
    if (additionalCollections.length > 0) {
      setCollectionList([...collectionList, ...additionalCollections])
    }
    // check if all collections have been retireved
    if (additionalCollections.length < batchNumber) {
      setDisableRequests(true)
    }
  }

  useEffect(() => {
    if (feedEnded && !disableRequests) {
      loadAdditionalCollections()
    }
  }, [feedEnded])

  useEffect(() => {
    if (selectedCategory) {
      getCollectionByCategory()
    }
  }, [selectedCategory])

  if (!config || !navigation) return null

  return (
    <Layout config={config} navigation={navigation} transparentHeader>
      <NextSeo title={'Collections'} titleTemplate={`%s | Collections`} />

      <SectionContainer maxWidth="lg" sectionGap={'sm'}>
        <Grid item container sx={{mt: 2}}>
          <Grid item container sx={{display: 'block'}}>
            <Typography variant="subtitle1" color="primary">
              {router.query?.category || 'Aikido'}
            </Typography>
            <Typography variant="h2" component="h1" gutterBottom>
              Collections
            </Typography>
          </Grid>

          <Grid item container>
            <CategoryList
              categories={[...categories]}
              selectedCategory={router?.query?.category}
              handleSelection={handleChipClick}
            />
          </Grid>

          <Grid item container>
            <Divider flexItem sx={{width: '100%', my: 2}} />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item container spacing={2}>
            {/* show the collections */}
            {collections.map((collection) => (
              <Fade key={collection.slug.current} in timeout={500}>
                <Grid item xs={12} sm={6}>
                  <CollectionCard collection={collection} />
                </Grid>
              </Fade>
            ))}

            {/* show the collections */}
            {collectionList.length == 0 && (
              <Typography variant="caption" align="center" sx={{my: 2, width: '100%'}}>
                No Collections to Display
              </Typography>
            )}

            {/* Get more collections when I enter the viewPort */}
            <Grid ref={loadMoreRef} item container justifyContent="center">
              <Fade in={!disableRequests}>
                <CircularProgress />
              </Fade>
            </Grid>
          </Grid>
        </Grid>
      </SectionContainer>
    </Layout>
  )
}

Collections.getInitialProps = async function (context) {
  const {category = null} = context?.query

  const collections = await client.fetch(
    `*[ ${filtering}
      ${category ? ` && "${category}" in categories[]->title` : ''}
      ][0...${batchNumber}]{
       ${collectionQuery}
      } ${ordering}
      `
  )

  const categories = await client.fetch(`*[_type == "category"]{
    title
  }`)

  return {
    collections,
    categories,
  }
}

export default Collections

Collections.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      author: PropTypes.object,
      publishedAt: PropTypes.string,
      categories: PropTypes.array,
      body: PropTypes.array,
      readTime: PropTypes.number,
      posts: PropTypes.arrayOf(PropTypes.object),
    })
  ),
}

const ordering = `| order(_createdAt asc)`

const filtering = ` _type == "collection" && publishedAt < now() && draft != true `

const postQuery = `
        publishedAt,
        categories,
        title,
        "categories": categories[]->title,
        slug,`

const collectionQuery = `
        publishedAt,
        categories,
        summary,
        title,
        illustration,
        slug,
        "categories": categories[]->title,
        "posts":posts[]->{
          ${postQuery}
        }
        `
