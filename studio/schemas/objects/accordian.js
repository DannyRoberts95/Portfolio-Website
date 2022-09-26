export default {
  type: 'object',
  name: 'accordian',
  title: 'Accordian',
  fields: [
    {
      type: 'string',
      name: 'summary',
      title: 'Accordian Summary'
    },
    {
      type: 'simplePortableText',
      name: 'content',
      title: 'Accordian Content'
    }
  ],
  preview: {
    select: {
      title: 'summary'
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Accordian'
      }
    }
  }
}
