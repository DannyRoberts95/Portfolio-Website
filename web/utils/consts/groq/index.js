import groq from 'groq'

export const siteConfigQuery = groq`
  *[_id == "global-config"] {
    title,
    url,
    disableCookieBanner,
    logos {
      "primary" :logoPrimary,
      "contrast" :logoContrast,
    },
  }[0]
  `

export const linkSnippet = groq`
  linkType == "external" => {
    title,
    url,
    linkType,
    _key
  },

linkType == "internal" => {
  _key,
  linkType,
  "title":internal->page->title,
  "slug":internal->slug,

},
linkType == "path" => {
  path,
  linkType,
  title,
  _key
  },
`

export const navigationQuery = groq`
*[_id == "site-navigation" ]{
  "mainNavigation":mainNavigation[]{
    ${linkSnippet}
  },

  "footerNavigation":footerNavigation[]{
    "links":links[]{${linkSnippet}}
  },
  "navigationCTAs":navigationCTAs[]{
      _key,
      "navLink":navLink{
        ${linkSnippet}
      },
  },
    footerText
 }[0]
  `

export const siteQuery = groq`
{
    'navigation': ${navigationQuery},
    'config': ${siteConfigQuery}
}
`
