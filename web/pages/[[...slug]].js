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
    "slugs": *[
      _type == "route"
     ${
       process.env.NODE_ENV !== 'development'
         ? ` && includeInSitemap != false && disallowRobots != true`
         : ''
     }
    ].slug.current,
  }`
    )
    .then((res) => {
      slugs = res.slugs
    })

  const paths = slugs.map((slug) => {
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

  console.time('fetch')
  console.log('------------------------------------------')
  console.log('Fetching Page Data...')
  console.log('------------------------------------------')

  console.log('SLUG: ' + slug)

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
        console.log('Page data returned!')
        console.timeEnd('fetch')
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
        console.timeEnd('fetch')
        console.log('Page data returned!')
        console.log('************************************************************')
        console.log(res)
        console.log('************************************************************')
        return res?.page ? {...res.page, slug} : undefined
      })
  }

  if (!data || !data._type === 'page') {
    console.log('PROBLEM!!! Page data contained no page!')
    console.log('PAGE DATA:', data)
    return {
      notFound: true,
    }
  }

  console.log('PAGE DATA PASSED:', data)
  return {
    props: data || {},
    revalidate: 5,
  }
}

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
