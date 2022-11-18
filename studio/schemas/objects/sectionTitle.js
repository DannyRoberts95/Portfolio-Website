export default {
  type: 'object',
  name: 'sectionTitle',
  title: 'Section Title',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Heading'
    }
  ],
  preview: {
    select: {
      heading: 'heading'
    },
    prepare({ heading }) {
      return {
        title: `${heading}`,
        subtitle: 'Text section'
      }
    }
  }
}
