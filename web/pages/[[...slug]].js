import imageUrlBuilder from '@sanity/image-url'
import groq from 'groq'
import {NextSeo} from 'next-seo'
import PropTypes from 'prop-types'

import Layout from 'components/layouts/Layout'
import RenderSections from 'components/RenderSections'
import {useRouter} from 'next/router'
import {linkSnippet} from 'utils/consts/groq'
import client from '../client'
import {getSlugVariations, slugParamToPath} from '../utils/urls'

const pageFragment = `
...,
content[] {
  ...,
  cta {
    ...,
    route->
  },
  ctas[] {
    "navLink":navLink{
      ${linkSnippet}
    },
  },

}`

export const getServerSideProps = async ({params}) => {
  const slug = slugParamToPath(params?.slug)

  let data

  if (slug === '/') {
    console.log('Frontpage requested!')
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
    console.log('Regular page requested!')
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

  if (!data || !data?._type === 'page') {
    console.log('⚠️ Error Getting Page Data ⚠️:\n', data)
    return {
      notFound: true,
    }
  }

  return {
    props: data || {},
  }
}

const builder = imageUrlBuilder(client)

const LandingPage = (props) => {
  const router = useRouter()

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
