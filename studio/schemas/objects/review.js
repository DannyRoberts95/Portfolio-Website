export default {
  type: 'object',
  name: 'review',
  title: 'Review',
  fields: [
      {
          type: 'string',
          name: 'reviewerName',
          title: 'Reviewer Name',
      },
      {
          type: 'string',
          name: 'reviewerType',
          title: 'Reviewer Type',
          description: 'Eg. Appsumo User',
      },
      {
          type: 'number',
          name: 'rating',
          title: 'Rating',
          description: 'Rating out of 5.',
      },
      {
          type: 'simplePortableText',
          name: 'body',
          title: 'Review Body',
      },
  ],
  preview: {
      select: {
          title: 'reviewerName',
          subtitle: 'rating',
      },
      prepare({ title, subtitle }) {
          return {
              title,
              subtitle,
          };
      },
  },
}
