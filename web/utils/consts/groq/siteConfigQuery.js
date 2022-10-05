import groq from 'groq'

export default groq`
  *[_id == "global-config"] {
    ...,
    logos {
      "primary" :logoPrimary{asset->{extension, url}},
      "contrast" :logoContrast{asset->{extension, url}},
    },


  }[0]
  `
