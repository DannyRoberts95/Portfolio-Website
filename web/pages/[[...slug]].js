import imageUrlBuilder from '@sanity/image-url'
import groq from 'groq'
import {NextSeo} from 'next-seo'
import PropTypes from 'prop-types'

import Layout from 'components/layouts/Layout'
import RenderSections from 'components/RenderSections'
import client from '../client'
import {getSlugVariations, slugParamToPath} from '../utils/urls'

const pageFragment = groq`
description,
openGraphImage,
slug,
title,
content`

export async function getStaticPaths() {
  let slugs = []
  await client
    .fetch(
      `{
    // Get the slug of all routes that should be in the sitemap
    "slugs": *[
      _type == "route" &&
      includeInSitemap != false &&
      disallowRobots != true
    ].slug.current,
  }`
    )
    .then((res) => {
      slugs = res.slugs
    })

  const paths = slugs.map((slug) => {
    console.log(slug)
    return {
      params: {slug: [slug]},
    }
  })

  return {
    paths: ['/', ...paths],
    fallback: false, // can also be true or 'blocking'
  }
}

export const getStaticProps = async ({params}) => {
  const slug = slugParamToPath(params?.slug)

  let data

  if (slug === '/') {
    data = await client
      .fetch(
        groq`
        *[_id == "global-config"][0]{
          frontpage -> {
            ${pageFragment}
          }
        }
      `
      )
      .then((res) => {
        console.log('Frontpage Response:\n'.res)
        return res?.frontpage ? {...res.frontpage, slug} : undefined
      })
  } else {
    // Regular route
    data = await client
      .fetch(
        // Get the route document with one of the possible slugs for the given requested path
        groq`*[_type == "route" && slug.current in $possibleSlugs][0]{
          page-> {
            ${pageFragment}
          }
        }`,
        {possibleSlugs: getSlugVariations(slug)}
      )
      .then((res) => {
        console.log('Regular Res:\n', res)
        return res?.page ? {...res.page, slug} : undefined
      })
  }

  console.log('****************************************************')
  console.log('Page Data:\n', data)
  console.log('****************************************************')

  if (!data || !data._type === 'page') {
    console.log('⚠️ Error Getting Page Data ⚠️:\n', data)
    return {
      notFound: true,
    }
  }

  return {
    props: data || {},
    revalidate: 5,
  }
}
// export const getServerSideProps = async ({params}) => {
//   const slug = slugParamToPath(params?.slug)

//   let data

//   if (slug === '/') {
//     data = await client
//       .fetch(
//         groq`
//         *[_id == "global-config"][0]{
//           frontpage -> {
//             ${pageFragment}
//           }
//         }
//       `
//       )
//       .then((res) => {
//         console.log('Frontpage Response:\n'.res)
//         return res?.frontpage ? {...res.frontpage, slug} : undefined
//       })
//   } else {
//     // Regular route
//     data = await client
//       .fetch(
//         // Get the route document with one of the possible slugs for the given requested path
//         groq`*[_type == "route" && slug.current in $possibleSlugs][0]{
//           page-> {
//             ${pageFragment}
//           }
//         }`,
//         {possibleSlugs: getSlugVariations(slug)}
//       )
//       .then((res) => {
//         console.log('Regular Res:\n', res)
//         return res?.page ? {...res.page, slug} : undefined
//       })
//   }

//   console.log('****************************************************')
//   console.log('Page Data:\n', data)
//   console.log('****************************************************')

//   if (!data || !data._type === 'page') {
//     console.log('⚠️ Error Getting Page Data ⚠️:\n', data)
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: data || {},
//   }
// }

const builder = imageUrlBuilder(client)

const LandingPage = (props) => {
  const {
    title = '',
    description,
    disallowRobots,
    openGraphImage,
    content = [],
    config = {},
    navigation,
    slug,
  } = props

  const firstSection = content[0]

  const transparentHeader = firstSection?._type === 'hero'

  const openGraphImages = openGraphImage
    ? [
        {
          url: builder.image(openGraphImage).width(800).height(600).url(),
          width: 800,
          height: 600,
          alt: title,
        },
        {
          // Facebook recommended size
          url: builder.image(openGraphImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: title,
        },
        {
          // Square 1:1
          url: builder.image(openGraphImage).width(600).height(600).url(),
          width: 600,
          height: 600,
          alt: title,
        },
      ]
    : []

  return (
    <Layout navigation={navigation} config={{transparentHeader, ...config}}>
      <NextSeo
        title={title}
        titleTemplate={`%s | ${config.title}`}
        description={description}
        canonical={config.url && `${config.url}/${slug}`}
        openGraph={{
          images: openGraphImages,
        }}
        noindex={disallowRobots}
      />
      {content && <RenderSections sections={content} />}
    </Layout>
  )
}

LandingPage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  slug: PropTypes.string,
  disallowRobots: PropTypes.bool,
  openGraphImage: PropTypes.any,
  content: PropTypes.any,
  config: PropTypes.any,
}

export default LandingPage
