// [slug].js

import groq from 'groq'
import client from '../../client'

import {Box, Chip, Container, Stack, Typography} from '@mui/material'
import Layout from 'components/layouts/Layout'
import SectionContainer from 'components/SectionContainer'
import {Hero, SectionTitle} from 'components/sections'
import {NextSeo} from 'next-seo'
import {useRouter} from 'next/router'
import {useEffect} from 'react'

import {useTheme} from '@emotion/react'
import Link from 'components/CustomLink'
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
  const {alt} = illustration
  const {name, nationality, dob, bio, experienced, image, email, phone, familiar} = cv.person

  console.log(cv)
  return (
    <>
      <Layout config={config} navigation={navigation} transparentHeader>
        <NextSeo title={'CV'} titleTemplate={`%s | ${config.title}`} description={'summary'} />
        {illustration && <Hero heading={name} backgroundImage={illustration} heroAlt={alt} dark />}
        <SectionContainer contentMaxWidth={false}>
          {/* SideBar */}
          {/* Personal info */}
          <SectionTitle heading="PERSONAL INFO" />
          <Container maxWidth={'md'} sx={{py: 2}}>
            <Stack
              sx={{mb: 2, border: (theme) => `solid 2px ${theme.palette.primary.main} `, p: 2}}
            >
              <Stack sx={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                <Typography variant="body1" fontWeight={700}>
                  NATIONALITY:
                </Typography>
                <Typography variant="body1">{nationality}</Typography>
              </Stack>
              <Stack sx={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                <Typography variant="body1" fontWeight={700}>
                  BORN:
                </Typography>
                <Typography variant="body1">{dob}</Typography>
              </Stack>
              <Stack sx={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                <Typography variant="body1" fontWeight={700}>
                  EMAIL:
                </Typography>
                <Typography variant="body1">
                  <Link href={`mailto:${email}`}>{email}</Link>
                </Typography>
              </Stack>
              <Stack sx={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                <Typography variant="body1" fontWeight={700}>
                  PHONE:
                </Typography>
                <Typography variant="body1">
                  <Link href={`tel:${phone}`}>{phone}</Link>
                </Typography>
              </Stack>
            </Stack>

            <StyledBlockContent blocks={bio} />

            <Stack
              sx={{mb: 2, border: (theme) => `solid 2px ${theme.palette.primary.main} `, p: 2}}
            >
              <Typography variant="h6">EXPERIENCED WITH:</Typography>
              <Stack direction={'row'} flexWrap="wrap" gap={0.5}>
                {experienced.map((item) => (
                  <Chip key={item} label={item} variant="outlined" />
                ))}
              </Stack>
              <Typography variant="h6">FAMILIAR WITH:</Typography>
              <Stack direction={'row'} flexWrap="wrap" gap={0.5}>
                {familiar.map((item) => (
                  <Chip key={item} label={item} variant="outlined" />
                ))}
              </Stack>
            </Stack>
          </Container>

          {mainSections.map((section) => (
            <Box sx={{my: 2}}>
              <SectionTitle heading={section.mainSectionTitle.heading} sx={{mb: 2}} />
              <Container maxWidth={'md'} sx={{py: 2}}>
                <StyledBlockContent blocks={section.mainSectionContent} />
              </Container>
            </Box>
          ))}
        </SectionContainer>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  let slugs = []
  await client
    .fetch(
      `{
    "slugs": *[
      _type == "cv"
    ].slug.current,
  }`
    )
    .then((res) => {
      slugs = res.slugs
    })

  const paths = slugs.map((slug) => {
    return {
      params: {slug: slug},
    }
  })

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}

export const getStaticProps = async ({params}) => {
  const slug = params?.slug

  const cv = await client.fetch(
    groq`*[_type == "cv" && slug.current == $slug ][0]{
      ...,
      "person":{
        "name":person->name,
        "dob": person->dob,
        "email":person->email,
        "phone":person->phone,
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
    props: {cv} || {},
    revalidate: 30,
  }
}

export default CVPage
