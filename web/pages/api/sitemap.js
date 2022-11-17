// this may break vercel deployment******

import groq from 'groq'
import isServer from 'utils/isServer'
import client from '../../client'
import {slugToAbsUrl} from '../../utils/urls'

const explicitPaths = ['/posts', '/collections']

export default async function handler(req, res) {
  if (isServer) {
    const {allRoutesSlugs, allPostSlugs, baseUrl} = await client.fetch(groq`{
    // Get the slug of all routes that should be in the sitemap
    "allRoutesSlugs": *[
      _type == "route" &&
      !(_id in path("drafts.**")) &&
      includeInSitemap != false &&
      disallowRobots != true
    ].slug.current,

     "allPostSlugs": *[
      _type == "post" &&
      draft != false
    ].slug.current,

    // And the base site URL
    "baseUrl": *[_id == "global-config"][0].url,
  }`)

    const sitemap = `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...allRoutesSlugs, ...allPostSlugs, ...explicitPaths]
  .map(
    (slug) => `
    <url>
    <loc>${slugToAbsUrl(slug, baseUrl)}</loc>
    </url>
    `
  )
  .join('\n')}

    </urlset>`

    console.log('**************')
    console.log('Sitemap Built!')
    console.log('**************')
    res.status(200).send(sitemap)
  }

  res.status(200).send()
}
