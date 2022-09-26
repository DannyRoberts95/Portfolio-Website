import client from '../../client'
import imageUrlBuilder from '@sanity/image-url'

export default function urlForSanityImage(source) {
  return imageUrlBuilder(client).image(source)
}
