// [slug].js

import groq from 'groq'
import client from '../../client'

import {Chip, Divider, Grid, Stack, Typography} from '@mui/material'
import Layout from 'components/layouts/Layout'
import SectionContainer from 'components/SectionContainer'
import {NextSeo} from 'next-seo'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import HeroImage from '../../components/HeroImage'

import {useTheme} from '@emotion/react'
import StyledBlockContent from 'components/StyledBlockContent'

const CVPage = (props) => {
  const router = useRouter()
  const theme = useTheme()
  const {cv, config, navigation} = props

  useEffect(() => {
    if (!cv) {
      router.push('/404')
    }
  }, [])

  if (!cv) return null
  const {illustration, mainSections = [], personalSectionContent} = cv
  const {caption, alt} = illustration
  const {name, nationality, dob, bio, experienced, familiar} = cv.person

  return (
    <>
      <Layout config={config} navigation={navigation} transparentHeader>
        <NextSeo title={'CV'} titleTemplate={`%s | ${config.title}`} description={'summary'} />
        {illustration && <HeroImage image={illustration} caption={caption} alt={alt} />}
        <SectionContainer>
          <Grid container spacing={0}>
            {/* SideBar */}
            <Grid item xs={12} md={4} sx={{border: `1px solid ${theme.palette.primary.main}`}}>
              {/* Personal info */}
              <Stack sx={{p: 2}} gap={1}>
                <StyledBlockContent blocks={personalSectionContent} />
                {/* <Typography variant="h2" gutterBottom>
                  {name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <b>Nationality: </b>
                  {nationality}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <b>DOB: </b>
                  {formatDate(new Date(dob).toDateString())}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <b>Bio:</b>
                  <StyledBlockContent blocks={bio} />
                </Typography> */}
              </Stack>
              {/* Skills */}
              <Stack sx={{p: 2}} gap={1}>
                <Typography variant="h2" gutterBottom>
                  Skills
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Experienced
                </Typography>
                <Stack direction={'row'} flexWrap="wrap" gap={0.5}>
                  {experienced.map((item) => (
                    <Chip key={item} label={item} variant="outlined" />
                  ))}
                </Stack>
                <Typography variant="h6" gutterBottom>
                  Familiar
                </Typography>
                <Stack direction={'row'} flexWrap="wrap" gap={0.5}>
                  {familiar.map((item) => (
                    <Chip key={item} label={item} variant="outlined" />
                  ))}
                </Stack>
              </Stack>
            </Grid>

            {/* Main Section */}
            <Grid item xs={12} md={8} sx={{border: `1px solid ${theme.palette.primary.main}`}}>
              {mainSections.map((section) => (
                <Grid item container sx={{p: 2}} flexDirection="column">
                  <Typography variant="h2">{section.mainSectionTitle.heading}</Typography>
                  <StyledBlockContent blocks={section.mainSectionContent} />
                  <Divider />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </SectionContainer>
      </Layout>
    </>
  )
}

CVPage.getInitialProps = async function (context) {
  const {slug = ''} = context.query

  const cv = await client.fetch(
    groq`*[_type == "cv" && slug.current == $slug ][0]{
      ...,
      "person":{
        "name":person->name,
        "dob": person->dob,
        "nationality": person->nationality,
        "image": person->image.asset,
        "bio":person->bio,
        "experienced":person->experienced,
        "familiar":person->familiar,
        "links":person->links,
      }
    }`,
    {slug}
  )

  return {
    cv,
  }
}

export default CVPage
