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
    { type: 'accordian', title: 'Accordian' },
    { type: 'embedVideo' },
    { type: 'embedCodeSnippet', title: 'Code Snippet' }
  ]
}
