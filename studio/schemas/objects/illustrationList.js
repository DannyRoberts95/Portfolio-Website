export default {
  title: 'Illustration List',
  name: 'illustrationList',
  type: 'object',
  // validation: Rule =>
  //   Rule.custom(
  //     (fields = {}) =>
  //       !fields.route || !fields.link || 'Only one link type is allowed'
  //   ),

  fields: [
    {
      title: 'Illustrations',
      name: 'illustrations',
      type: 'array',
      of: [{ type: 'illustration' }]
    }
  ],
  preview: {
    select: {
      illustrations: 'illustrations'
    },
    prepare({ illustrations }) {
      return {
        title: `Illustration List`,
        subtitle: illustrations.length
      }
    }
  }
}
