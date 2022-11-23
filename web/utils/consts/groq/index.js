import groq from 'groq'

export const siteConfigQuery = groq`
  *[_id == "global-config"] {
    title,
    url,
    disableCookieBanner,
    logos {
      "primary" :logoPrimary{asset->{extension, url}},
      "contrast" :logoContrast{asset->{extension, url}},
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
  "title":internal->page->title,
  "itemType":linkType,
  "slug":internal->slug,

},
linkType == "path" => {
  path,
  title,
  "itemType":linkType,
  _key
  },
`

export const navigationQuery = groq`
*[_id == "site-navigation" ]{
  "mainNavigation":mainNavigation[]{
    ${linkSnippet}
    _type=="navLinkDropdown"=>{
      "itemType":"navLinkDropdown",
      "baseLink":baseLink{
        ${linkSnippet}
      },
      "childLinks":childLinks[]{
        ${linkSnippet}
      },
      _key,
    },
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
