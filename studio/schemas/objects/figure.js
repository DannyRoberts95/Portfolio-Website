export default {
  name: 'figure',
  title: 'Image',
  type: 'image',

  fieldsets: [
    {
      title: 'Dimensions',
      name: 'dimensions',
    },
    {
      title: 'Details',
      name: 'details',
    },
  ],

  options: {
    hotspot: true,
  },

  fields: [
    {
      title: 'Figure Border',
      name: 'border',
      type: 'boolean',
      initialValue: false,
    },
    {
      title: 'Aspect Ration',
      name: 'aspectRatio',
      type: 'string',
      options: {
        isHighlighted: true,
        list: ['16/9', '1/1', '3/4', '4/3', 'custom'],
        initialValue: '16/9',
      },
      validation: (Rule) => Rule.required(),
      fieldset: 'dimensions',
    },

    {
      title: 'Width',
      name: 'figureWidth',
      type: 'number',
      initialValue: 100,
      hidden: ({ parent }) => parent?.aspectRatio !== 'custom',
      options: {
        isHighlighted: true,
      },
      fieldset: 'dimensions',
      validation: (Rule) => Rule.max(500).min(25),
    },
    {
      title: 'Height',
      name: 'figureHeight',
      type: 'number',
      initialValue: 100,
      hidden: ({ parent }) => parent?.aspectRatio !== 'custom',
      options: {
        isHighlighted: true,
      },
      fieldset: 'dimensions',
      validation: (Rule) => Rule.max(500).min(25),
    },

    {
      title: 'Caption (Optional)',
      name: 'caption',
      type: 'string',
      options: {
        isHighlighted: true,
      },
      fieldset: 'details',
    },

    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessiblity.',
      options: {
        isHighlighted: true,
      },
      fieldset: 'details',
    },
  ],
  preview: {
    select: {
      media: 'image',
      alt: 'alt',
      caption: 'caption',
    },
    prepare({ media, alt, caption = 'No Caption or Alt' }) {
      return {
        title: `${alt || caption}`,
        media,
      }
    },
  },
}
