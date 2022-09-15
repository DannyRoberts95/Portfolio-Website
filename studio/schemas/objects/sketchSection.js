export default {
  type: 'object',
  name: 'sketchSection',
  title: 'Sketch',
  fields: [
    {
      type: 'string',
      name: 'type',
      title: 'Type'
    },
    {
      type: 'text',
      name: 'script',
      title: 'Script'
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
