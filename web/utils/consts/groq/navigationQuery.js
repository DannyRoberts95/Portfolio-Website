const linkSnippet = `
linkType == "external" => {
...,
 "itemType":linkType,
},

linkType == "internal" => {
  ...,
  "itemType":linkType,
  "page":internal->page->title,
  "slug":internal->slug,

},
linkType == "path" => {
  ...,
  "itemType":linkType,
},
`

export default `
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
      ${linkSnippet}
    },
    navigationCTAs,
    footerText
 }[0]
  `
