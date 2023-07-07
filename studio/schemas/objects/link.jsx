import React from 'react'

const LinkRender = ({ children }) => <span>{children} 🌍</span>

export default {
  title: 'URL',
  name: 'link',
  type: 'object',
  fields: [
    {
      title: 'URL',
      name: 'href',
      description: 'Makes sure the URL is valid as broken links hurt SEO and make jesus cry.',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['https', 'http', 'mailto', 'tel'],
        }),
    },
  ],
  blockEditor: {
    icon: () => '🌍',
    render: LinkRender,
  },
}
