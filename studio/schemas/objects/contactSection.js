export default {
  type: 'object',
  name: 'contactSection',
  title: 'Contact Section',
  fields: [
    {
      name: 'sectionTitle',
      type: 'sectionTitle'
    }
  ],
  preview: {
    select: {
      heading: 'sectionTitle.heading'
    },
    prepare({ heading }) {
      return {
        title: `${heading || 'Contact Section'}`,
        subtitle: 'Contact Form'
      }
    }
  }
}
