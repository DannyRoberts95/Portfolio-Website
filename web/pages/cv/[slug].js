// [slug].js

import groq from 'groq'
import client from '../../client'

import {Chip, Grid, Stack, Typography} from '@mui/material'
import {Box} from '@mui/system'
import Layout from 'components/layouts/Layout'
import PostBlockContent from 'components/PostBlockContent'
import SectionContainer from 'components/SectionContainer'
import {NextSeo} from 'next-seo'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import HeroImage from '../../components/HeroImage'

const PostPage = (props) => {
  const router = useRouter()
  const {cv, config, navigation} = props

  useEffect(() => {
    if (!cv) {
      router.push('/404')
    }
  }, [])

  if (!cv) return null

  console.log(cv)

  const {illustration} = cv
  const {image, caption, alt} = illustration
  config.transparentHeader = true

  return (
    <>
      <Layout config={config} navigation={navigation} transparentHeader>
        <NextSeo title={'CV'} titleTemplate={`%s | ${config.title}`} description={'summary'} />
        {illustration && <HeroImage image={image} caption={caption} alt={alt} />}
        <SectionContainer>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              {/* Personal info */}
              <Box sx={{border: '1px solid black', p: 2}}>
                <Typography variant="overline" gutterBottom>
                  Personal Info
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <b>Name: </b>
                  {cv.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <b>Nationality: </b>
                  {cv.nationality}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <b>DOB: </b>
                  {new Date(cv.dob).toLocaleDateString()}
                </Typography>
              </Box>

              <Stack sx={{border: '1px solid black', p: 2}} gap={1}>
                <Typography variant="overline" gutterBottom>
                  Skillset
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Experienced
                </Typography>
                <Stack direction={'row'} flexWrap="wrap" gap={0.5}>
                  {cv.experienced.map((item) => (
                    <Chip key={item} label={item} variant="outlined" />
                  ))}
                </Stack>
                <Typography variant="subtitle1" gutterBottom>
                  Familiar
                </Typography>
                <Stack direction={'row'} flexWrap="wrap" gap={0.5}>
                  {cv.familiar.map((item) => (
                    <Chip key={item} label={item} variant="outlined" />
                  ))}
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={8}>
              <Box sx={{border: '1px solid black', p: 2}}>
                <PostBlockContent blocks={cv.mainSection} />
              </Box>
            </Grid>
          </Grid>
        </SectionContainer>
      </Layout>
    </>
  )
}

PostPage.getInitialProps = async function (context) {
  const {slug = ''} = context.query

  const cv = await client.fetch(
    groq`*[_type == "cv" && slug.current == $slug ][0]{
        ...
      }`,
    {slug}
  )

  return {
    cv,
  }
}

export default PostPage
