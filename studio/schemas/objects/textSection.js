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
              name: 'sectionSummary',
              type: 'portableText',
              title: 'Section Summary '
            },
            {
              type: 'boolean',
              name: 'reversed',
              title: 'Reverse Layout',
              initalValue: false
            },
            {
              name: 'sectionText',
              type: 'portableText',
              title: 'Section Text '
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      heading: 'sectionTitle.heading',
      sections: 'sections'
    },
    prepare({ heading, sections }) {
      return {
        title: `${heading || 'Text Section - No Header'}`,
        subtitle: `${sections.length} - ${sections.map(sec => `${sec.sectionTitle}`).join(', ')}`
      }
    }
  }
}
