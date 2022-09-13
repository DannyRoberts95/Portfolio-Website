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
      type: 'string',
      name: 'script',
      title: 'Script'
    }
  ],
  preview: {
    select: {
      title: 'summary'
    },
    prepare({ type }) {
      return {
        title: type,
        subtitle: 'sketch'
      }
    }
  }
}
