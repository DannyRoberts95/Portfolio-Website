export default {
  type: 'object',
  name: 'gridSection',
  title: 'Grid Section',
  fields: [
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
      name: 'carousel',
      type: 'boolean',
      title: 'Carousel'
    },
    {
      name: 'reverseCarousel',
      type: 'boolean',
      title: 'Reverse Carousel'
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
      size: 'size',
      reverseCarousel: 'reverseCarousel',
      carousel: 'carousel'
    },
    prepare({ title, carousel, reverseCarousel, size }) {
      return {
        title,
        subtitle: `${reverseCarousel ? 'Reversed' : ''}
        ${carousel ? 'Carousel' : ''}
         : ${size} `
      }
    }
  }
}
