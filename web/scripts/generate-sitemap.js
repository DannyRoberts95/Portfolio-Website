const fs = require('fs')
// const {slugToAbsUrl} = require('../utils/urls')
const sanityClient = require('@sanity/client')

function isServer() {
  return !(typeof window != 'undefined' && window.document)
}

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION, // use current UTC date - see "specifying API version"!
  useCdn: isServer() ? true : false, // `false` if you want to ensure fresh data
})

async function generateSitemap() {
  const explicitPaths = ['/posts', '/collections']

  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  // const pages = await globby(['pages/**/*{.js,.mdx}', '!pages/_*.js', '!pages/api'])

  const {allRoutesSlugs, allPostSlugs, baseUrl} = await client.fetch(`{
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

  const buildUrl = (slug) =>
    `
    <url>
      <loc>${baseUrl}/${slug}</loc>
    </url>
    `

  const sitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${[...allRoutesSlugs, ...allPostSlugs, ...explicitPaths].map(buildUrl).join('\n')}
  </urlset>`

  fs.writeFileSync('public/sitemap.xml', sitemap)
}

generateSitemap()
