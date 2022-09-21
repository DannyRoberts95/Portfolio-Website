export default {
  type: 'object',
  name: 'sketchSection',
  title: 'Sketch',
  fields: [
    {
      name: 'sectionTitle',
      type: 'sectionTitle',
      title: 'Section Title'
    },
    {
      type: 'boolean',
      name: 'reversed',
      title: 'Reverse Layout',
      initalValue: false
    },

    {
      type: 'string',
      name: 'type',
      title: 'Type',
      initalValue: 'testSketch',

      validation: Rule => Rule.required()
    },
    {
      type: 'pagePortableText',
      name: 'body',
      title: 'Body'
    },
    {
      name: 'ctas',
      type: 'array',
      title: 'Call to actions',
      of: [
        {
          title: 'Call to action',
          type: 'cta'
        }
      ],
      validation: Rule => Rule.max(3)
    }
  ],
  preview: {
    select: {
      title: 'header',
      type: 'type'
    },
    prepare({ title, type }) {
      return {
        title,
        subtitle: `Sketch: ${type}`
      }
    }
  }
}
