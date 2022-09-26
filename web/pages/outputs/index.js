import {useTheme} from '@emotion/react'
import {
  Box,
  CircularProgress,
  Fade,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
  useMediaQuery,
} from '@mui/material'
import CategoryList from 'components/CategoryList'
import Figure from 'components/Figure'
import Layout from 'components/layouts/Layout'
import SectionContainer from 'components/SectionContainer'
import SectionTitle from 'components/SectionTitle'
import {NextSeo} from 'next-seo'
import {useRouter} from 'next/router'
import {useEffect, useRef, useState} from 'react'
import client from '../../client'
import useOnScreen from '../../hooks/useOnScreen'

const batchNumber = 4

function OutputList(props) {
  const router = useRouter()
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.down('lg'))
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))
  const {
    outputs,
    categories,
    handleLoadMore,
    handleLoadMoreByCategory,
    disableLoadMore,
    ...others
  } = props
  const {category: selectedCategory = null} = router.query

  const loadMoreRef = useRef(null)
  const feedEnded = useOnScreen(loadMoreRef, 0.2)

  const calcCols = () => {
    if (isXs) return 1
    if (isMd) return 2
    return 3
  }

  useEffect(() => {
    if (feedEnded && !disableLoadMore) {
      handleLoadMore()
    }
  }, [feedEnded])

  const handleChipClick = (val) => {
    if (selectedCategory === val) {
      router.push('/outputs').then(() => handleLoadMoreByCategory(null))
    } else {
      router.push(`/outputs?category=${val}`).then(() => handleLoadMoreByCategory(val))
    }
  }

  return (
    <Box {...others}>
      {handleLoadMoreByCategory && categories && (
        <SectionContainer maxWidth={false}>
          <Box sx={{p: 2}}>
            <CategoryList
              categories={[...categories]}
              selectedCategory={router?.query?.category}
              handleSelection={handleChipClick}
            />
          </Box>
        </SectionContainer>
      )}

      <SectionContainer border={false} maxWidth={false}>
        <ImageList
          cols={calcCols()}
          variant={isXs ? 'standard' : 'quilted'}
          sx={{
            m: 2,
            mb: 5,
            overflowY: 'inherit !important',
          }}
          gap={16}
        >
          {[...outputs].map((output) =>
            output.media.map((media) => (
              <Fade key={media._key} in timeout={500}>
                <ImageListItem
                  sx={{
                    transition: `all 0.2s`,
                    webkitFilter: 'invert(0)',
                    ':hover': {
                      webkitFilter: 'invert(1)',
                      filter: 'invert(1)',
                    },
                  }}
                >
                  <Figure value={media} lightBox hideCaption />
                </ImageListItem>
              </Fade>
            ))
          )}
        </ImageList>

        {/* show the posts */}
        {outputs.length === 0 && (
          <Grid item container justifyContent="center">
            <Typography variant="caption" align="center" sx={{my: 4, width: '100%'}}>
              No Outputs to Display
            </Typography>
          </Grid>
        )}

        {/* Get more posts when I enter the users viewPort */}
        <Fade appear in={!disableLoadMore && Boolean(handleLoadMore)} unmountOnExit>
          <Grid item container justifyContent="center" sx={{py: 2}}>
            <CircularProgress />
          </Grid>
        </Fade>
        <span ref={loadMoreRef} />
      </SectionContainer>
    </Box>
  )
}

const Outputs = (props) => {
  const theme = useTheme()
  const router = useRouter()

  const {config, navigation, outputs = [], categories} = props
  const [disableRequests, setDisableRequests] = useState(false)
  const {category: selectedCategory = null} = router.query

  const [outputList, setOutputList] = useState(outputs)

  // Fetch the first batch of categorised outputs
  const getOutputByCategory = async (cat) => {
    const categoricalOutputs = await client.fetch(
      `*[${outputFiltering} ${
        cat ? ` && "${cat}" in categories[]->title` : ''
      }][0...${batchNumber}]{
        ${outputQuery}
      }${ordering}
      `
    )
    const allCollectionsRetrieved = categoricalOutputs.length < batchNumber
    setDisableRequests(allCollectionsRetrieved)
    setOutputList(categoricalOutputs)
  }

  // Fetch the next 5 outputs and add them to the list
  const loadAdditionalOutputs = async () => {
    const startIndex = outputList.length
    const endIndex = startIndex + batchNumber
    const additionalOutputs = await client.fetch(
      `*[${outputFiltering} ${
        selectedCategory ? ` && "${selectedCategory}" in categories[]->title` : ''
      }][${startIndex}...${endIndex}]{
        ${outputQuery}
      }${ordering}
      `
    )
    if (additionalOutputs.length > 0) {
      setOutputList([...outputList, ...additionalOutputs])
    }
    // check if all outputs have been retireved
    if (additionalOutputs.length < batchNumber || additionalOutputs.length === 0) {
      setDisableRequests(true)
    }
  }

  useEffect(() => {
    const {category = null} = router.query
    if (category) {
      getOutputByCategory()
    }
  }, [router.query.toString()])

  if (!config || !navigation) return null

  return (
    <Layout config={config} navigation={navigation} transparentHeader>
      <NextSeo title={config.title} titleTemplate={`%s | ${config.title}`} />

      <SectionTitle
        block={{heading: 'Outputs', label: router.query?.category || 'Assorted'}}
        sticky={false}
      />

      <OutputList
        outputs={outputList}
        handleLoadMore={loadAdditionalOutputs}
        categories={categories}
        handleLoadMoreByCategory={getOutputByCategory}
        disableLoadMore={disableRequests}
      />
    </Layout>
  )
}

Outputs.getInitialProps = async function (context) {
  const {category = null} = context?.query

  const outputs = await client.fetch(
    `*[${outputFiltering}
      ${category ? ` && "${category}" in categories[]->title` : ''}
      ][0...${batchNumber}]{
       ${outputQuery}
      } ${ordering}
      `
  )

  const categories = await client.fetch(`*[_type == "category"]{
    title
  }`)

  return {
    outputs,
    categories,
  }
}

export default Outputs

const outputFiltering = ` _type == "output"`

const ordering = `| order(_createdAt desc)`

const outputQuery = `
        categories,
        summary,
        title,
        "categories": categories[]->title,
        slug,
        ...
        `

// Outputs.propTypes = {
//   categories: PropTypes.arrayOf(PropTypes.object),
//   outputs: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string,
//       author: PropTypes.object,
//       publishedAt: PropTypes.string,
//       categories: PropTypes.array,
//       body: PropTypes.array,
//       readTime: PropTypes.number,
//     })
//   ),
// }
