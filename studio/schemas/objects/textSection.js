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
              name: 'sectionTitle',
              type: 'string',
              title: 'Section Title'
            },
            {
              name: 'sectionSummary',
              type: 'portableText',
              title: 'Section Summary'
            },
            {
              name: 'sectionText',
              type: 'portableText',
              title: 'Section Text '
            },
            {
              name: 'postText',
              type: 'portableText',
              title: 'Post Text '
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      sections: 'sections'
    },
    prepare({ sections, title }) {
      return {
        title: `Text Section: ${title}`,
        subtitle: `${sections.length} - ${sections.map(sec => `${sec.sectionTitle}`).join(', ')}`
      }
    }
  }
}
