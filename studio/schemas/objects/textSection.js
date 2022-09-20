export default {
  type: 'object',
  name: 'textSection',
  title: 'Text',
  fields: [
    {
      name: 'sectionTitle',
      type: 'sectionTitle',
      title: 'Section Title'
    },

    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          name: 'textSection',
          title: 'textSection',
          type: 'object',
          fields: [
            {
              name: 'sectionTitle',
              title: 'Section title',
              type: 'string'
            },
            {
              name: 'sectionText',
              type: 'portableText',
              title: 'Section Text '
            },
            {
              type: 'boolean',
              name: 'reversed',
              title: 'Reverse Layout',
              initalValue: false
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      heading: 'sectionTitle.heading'
    },
    prepare({ heading }) {
      return {
        title: `${heading}`,
        subtitle: 'Text section'
      }
    }
  }
}
