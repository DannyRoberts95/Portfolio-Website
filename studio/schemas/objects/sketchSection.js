export default {
  type: 'object',
  name: 'sketchSection',
  title: 'Sketch',
  fields: [
    {
      type: 'string',
      name: 'type',
      title: 'Type',
      initalValue: 'testSketch',
      options: {
        isHighlighted: true,
        list: ['testSketch']
      },
      validation: Rule => Rule.required()
    },
    {
      type: 'pagePortableText',
      name: 'body',
      title: 'Body'
    }
  ],
  preview: {
    select: {
      type: 'type'
    },
    prepare({ type }) {
      return {
        title: type,
        subtitle: 'sketch'
      }
    }
  }
}
