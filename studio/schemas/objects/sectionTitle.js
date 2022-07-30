export default {
  type: 'object',
  name: 'sectionTitle',
  title: 'Section Title',
  fields: [
    {
      name: 'label',
      type: 'string',
      title: 'Label',
    },
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
    },
    {
      name: 'centered',
      type: 'boolean',
      title: 'Center Header',
    },
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({ heading }) {
      return {
        title: `${heading}`,
        subtitle: 'Text section',
      };
    },
  },
};
