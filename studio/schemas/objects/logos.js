export default {
  title: 'Brand Logos',
  name: 'logos',
  description: 'Upload SVG files for best results.',
  type: 'object',
  fields: [
      {
          title: 'Brand logo',
          description: 'The primary branding logo for the website.',
          name: 'logoPrimary',
          type: 'image',
      },
      {
          title: 'Brand logo white',
          description: 'A white version of the logo for display on dark surfaces.',
          name: 'logoContrast',
          type: 'image',
      },
  ],
}
