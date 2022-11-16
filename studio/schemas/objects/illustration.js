export default {
  type: 'object',
  name: 'illustration',
  title: 'Illustration',
  fields: [
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Caption (Optional)'
    },
    {
      name: 'alt',
      description:
        'Alternative text that describes the image. Important for SEO and screen readers.',
      type: 'string',
      title: 'Alt text'
    }
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'image'
    },
    prepare({ title, media }) {
      return {
        title,
        media
      }
    }
  }
}
