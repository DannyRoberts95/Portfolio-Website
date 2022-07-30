import groq from 'groq'

export default groq`
  *[_id == "global-config"] {
    ...,
    logos {
      "primary" :logoPrimary{asset->{extension, url}},
      "contrast" :logoContrast{asset->{extension, url}},
    },

    "mainNavigation":{
      "routes": mainNavigation[_type == "reference"] -> {
        ...,
        "title": page->title
      },
      "external":mainNavigation[_type == "externalLink"]
    },
    "footerNavigation":{
      "routes": footerNavigation[_type == "reference"] -> {
        ...,
        "title": page->title
      },
      "external":footerNavigation[_type == "externalLink"]
    },
  }[0]
  `
