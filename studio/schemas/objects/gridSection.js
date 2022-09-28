export default {
  type: 'object',
  name: 'gridSection',
  title: 'Grid Section',
  fields: [
    {
      name: 'sectionTitle',
      type: 'sectionTitle',
      title: 'Section Title'
    },

    {
      title: 'Size',
      name: 'size',
      type: 'string',
      options: {
        list: ['tiny', 'small', 'medium', 'large']
      },
      initialValue: 'medium'
    },

    {
      name: 'tiles',
      title: 'Tiles',
      type: 'array',
      of: [{ type: 'tile' }]
    }
  ],
  preview: {
    select: {
      title: 'sectionTitle.heading',
      size: 'size'
    },
    prepare({ title, size }) {
      return {
        title,
        subtitle: `Grid : ${size} `
      }
    }
  }
}
