export default {
  type: 'object',
  name: 'sectionTitle',
  title: 'Section Title',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Heading'
    },
    {
      name: 'reverseDirection',
      type: 'boolean',
      title: 'Reverse Direction'
    }
  ],
  preview: {
    select: {
      heading: 'heading',
      reverseDirection: 'reverseDirection'
    },
    prepare({ heading, reverseDirection }) {
      return {
        title: `${heading}`,
        subtitle: `Section Heading - ${reverseDirection}`
      }
    }
  }
}
