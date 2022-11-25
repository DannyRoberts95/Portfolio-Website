export default {
  type: 'object',
  name: 'textSection',
  title: 'Text',
  fields: [
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
      sections: 'sections'
    },
    prepare({ sections }) {
      return {
        title: `Text Section`,
        subtitle: `${sections.length} - ${sections.map(sec => `${sec.sectionTitle}`).join(', ')}`
      }
    }
  }
}
