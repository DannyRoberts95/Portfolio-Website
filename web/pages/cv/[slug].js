// [slug].js

import groq from 'groq'
import client from '../../client'

import {Chip, Grid, Stack, Typography} from '@mui/material'
import Layout from 'components/layouts/Layout'
import SectionContainer from 'components/SectionContainer'
import {NextSeo} from 'next-seo'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import HeroImage from '../../components/HeroImage'

import {useTheme} from '@emotion/react'
import {Box} from '@mui/system'
import SectionTitle from 'components/SectionTitle'
import StyledBlockContent from 'components/StyledBlockContent'
import formatDate from '../../utils/helpers/formatDate'

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
  const {illustration, mainSections = []} = cv
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
            <Grid item xs={12} md={4}>
              {/* Personal info */}
              <SectionTitle small block={{heading: 'Info', label: 'Info'}} />
              <Stack sx={{border: `1px solid ${theme.palette.primary.main}`, p: 2}} gap={1}>
                <Typography variant="h3" gutterBottom>
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
                </Typography>
              </Stack>
              {/* Skills */}
              <SectionTitle small block={{heading: 'Skills'}} />
              <Stack sx={{border: `1px solid ${theme.palette.primary.main}`, p: 2}} gap={1}>
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
            <Grid item xs={12} md={8}>
              {mainSections.map((section) => (
                <Grid item container>
                  {console.log(section)}
                  <Box sx={{border: `1px solid ${theme.palette.primary.main}`, width: '100%'}}>
                    <SectionTitle small block={section.mainSectionTitle} />
                    <Box sx={{p: 2}}>
                      <StyledBlockContent blocks={section.mainSectionContent} />
                    </Box>
                  </Box>
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
