export default {
  type: 'object',
  name: 'accordian',
  title: 'Accordian',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title'
    },
    {
      type: 'portableText',
      name: 'summary',
      title: 'Summary Details'
    },
    {
      type: 'portableText',
      name: 'content',
      title: 'Content'
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Accordian'
      }
    }
  }
}
