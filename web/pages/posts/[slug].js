// [slug].js

import groq from 'groq'
import client from '../../client'

import Layout from 'components/layouts/Layout'
import {NextSeo} from 'next-seo'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import HeroImage from '../../components/HeroImage'
import Post from '../../components/Post'

const PostPage = (props) => {
  const router = useRouter()
  const {post, config, navigation} = props

  useEffect(() => {
    if (!post) {
      router.push('/404')
    }
  }, [])

  if (!post) return null

  const {title = 'Missing title', summary = '', illustration} = post

  const {image, caption, alt} = illustration

  config.transparentHeader = true

  return (
    <>
      <Layout config={config} navigation={navigation} transparentHeader>
        <NextSeo
          title={title}
          titleTemplate={`%s | ${config.title}`}
          description={summary}
          noindex={post.draft}
        />
        {illustration && <HeroImage image={image} caption={caption} alt={alt} />}
        <Post post={post} />
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  let slugs = await client.fetch(
    `*[_type == "post" && publishedAt < now() && draft != true].slug.current`
  )

  const paths = slugs.map((slug) => {
    return {
      params: {slug},
    }
  })

  return {
    paths: paths,
    fallback: false, // can also be true or 'blocking'
  }
}

export async function getStaticProps({params}) {
  const {slug = ''} = params

  const post = await client.fetch(
    groq`*[_type == "post" && slug.current == $slug && publishedAt < now()][0]{
        ...,
        _key,
        "categories": categories[]->{
          title,
          color},
        "author":{
          "name": author->name,
          "image": author->image.asset,
        },
        illustration
      }`,
    {slug}
  )

  return {
    props: {
      post,
    },
    revalidate: 30,
  }
}

export default PostPage
