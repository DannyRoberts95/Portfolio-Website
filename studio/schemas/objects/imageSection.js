export default {
  type: 'object',
  name: 'imageSection',
  title: 'Image with text',
  fields: [
    {
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'sectionTitle'
    },
    {
      name: 'body',
      type: 'portableText',
      title: 'Text'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'figure'
    },
    {
      title: 'Reverse Layout',
      name: 'reversed',
      description: 'Reverse the layout so the image appears before the text.',
      type: 'boolean'
    },
    {
      title: 'Elevate',
      name: 'elevateImage',
      description:
        'Display the image with a slight elevation. Disable this is the image has transparancy.',
      type: 'boolean'
    },
    {
      name: 'ctas',
      type: 'array',
      title: 'Call to actions',
      of: [
        {
          title: 'Call to action',
          type: 'cta'
        }
      ],
      validation: Rule => Rule.max(3)
    }
  ],
  preview: {
    select: {
      heading: 'sectionTitle.heading',
      subtitle: 'label',
      media: 'image'
    },
    prepare({ heading, media }) {
      return {
        title: `Image: ${heading}`,
        subtitle: 'Image section',
        media
      }
    }
  }
}
