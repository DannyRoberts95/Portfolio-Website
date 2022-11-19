export const siteConfigQuery = `
  *[_id == "global-config"] {
    ...,
    logos {
      "primary" :logoPrimary{asset->{extension, url}},
      "contrast" :logoContrast{asset->{extension, url}},
    },


  }[0]
  `

export const linkSnippet = `
linkType == "external" => {
...,
 "itemType":linkType,
},

linkType == "internal" => {
  ...,
  "title":internal->page->title,
  "itemType":linkType,
  "slug":internal->slug,

},
linkType == "path" => {
  ...,
  "itemType":linkType,
},
`

export const navigationQuery = `
*[_id == "site-navigation" ] {

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
    ...,
    "links":links[]{${linkSnippet}}

    },
    "navigationCTAs":navigationCTAs[]{
      ...,
      "navLink":navLink{
        ${linkSnippet}
      },
    },
    footerText
 }[0]
  `

export const siteQuery = `
{
    'navigation': ${navigationQuery},
    'config': ${siteConfigQuery}
}
`