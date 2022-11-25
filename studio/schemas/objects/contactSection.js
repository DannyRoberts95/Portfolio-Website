export default {
  type: 'object',
  name: 'contactSection',
  title: 'Contact Section',
  fields: [],
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
