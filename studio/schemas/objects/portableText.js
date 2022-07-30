export default {
  title: 'Portable Text',
  name: 'portableText',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'body1', value: 'body1' },
        { title: 'body2', value: 'body2' },
        { title: 'H6', value: 'h6' },
        { title: 'H5', value: 'h5' },
        { title: 'H4', value: 'h4' },
        { title: 'H3', value: 'h3' },
        { title: 'H2', value: 'h2' },
        { title: 'body1-centered', value: 'body1-centered' },
        { title: 'body2-centered', value: 'body2-centered' },
        { title: 'H6-centered', value: 'h6-centered' },
        { title: 'H5-centered', value: 'h5-centered' },
        { title: 'H4-centered', value: 'h4-centered' },
        { title: 'H3-centered', value: 'h3-centered' },
        { title: 'H2-centered', value: 'h2-centered' },
        { title: 'caption', value: 'caption' },
        { title: 'Quote', value: 'blockquote' }
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' }
        ],
        annotations: [{ type: 'link' }]
      }
    },
    { type: 'figure' },
    { type: 'embedVideo' },
    { type: 'embedCodeSnippet', title: 'Code Snippet' }
  ]
}
