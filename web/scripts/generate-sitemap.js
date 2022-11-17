const fs = require('fs')
const client = require('../client')
const {slugToAbsUrl} = require('../utils/urls')

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

  const buildUrl = (slug) => (slug) =>
    `
    <url>
      <loc>${slugToAbsUrl(slug, baseUrl)}</loc>
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
