export default {
  type: 'object',
  name: 'sketchSection',
  title: 'Sketch',
  fields: [
    {
      type: 'boolean',
      name: 'reversed',
      title: 'Reverse Layout',
      initalValue: false
    },
    {
      type: 'string',
      name: 'header',
      title: 'Section Header',
      validation: Rule => Rule.max(50)
    },
    {
      type: 'string',
      name: 'type',
      title: 'Type',
      initalValue: 'testSketch',
      options: {
        isHighlighted: true,
        list: ['testSketch', 'interactiveRectangle']
      },
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
      validation: Rule => Rule.max(2)
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
