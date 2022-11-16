export default {
  title: 'Illustration List',
  name: 'figureList',
  type: 'object',
  // validation: Rule =>
  //   Rule.custom(
  //     (fields = {}) =>
  //       !fields.route || !fields.link || 'Only one link type is allowed'
  //   ),

  fields: [
    {
      title: 'Columns',
      name: 'cols',
      type: 'number',
      initialValue: 3
    },
    {
      title: 'List Type',
      name: 'variant',
      type: 'string',
      initialValue: 'standard',
      options: {
        isHighlighted: true,
        list: ['standard', 'woven', 'quilted']
      }
    },
    {
      title: 'Illustrations',
      name: 'figures',
      type: 'array',
      of: [{ type: 'figure' }]
    }
  ],
  preview: {
    select: {
      images: 'figures'
    },
    prepare({ images }) {
      return {
        title: `figure List`,
        subtitle: images.length
      }
    }
  }
}
