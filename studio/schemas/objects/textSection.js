export default {
  type: 'object',
  name: 'textSection',
  title: 'Text',
  fields: [
    {
      name: 'sectionTitle',
      type: 'sectionTitle',
      title: 'Section Title',
    },

    {
      name: 'text',
      type: 'portableText',
      title: 'Text Section',
    },
  ],
  preview: {
    select: {
      heading: 'sectionTitle.heading',
    },
    prepare({ heading }) {
      return {
        title: `${heading}`,
        subtitle: 'Text section',
      };
    },
  },
};
