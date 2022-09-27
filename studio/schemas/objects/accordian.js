export default {
  type: 'object',
  name: 'accordian',
  title: 'Accordian',
  fields: [
    {
      type: 'boolean',
      name: 'exapnded',
      title: 'Expanded'
    },
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
