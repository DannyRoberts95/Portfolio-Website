export default {
  type: 'object',
  name: 'hero',
  title: 'Hero',
  fields: [
    {
      name: 'dark',
      type: 'boolean',
      title: 'Dark'
    },
    {
      name: 'blendText',
      type: 'boolean',
      title: 'Blend Text'
    },
    {
      name: 'disbaleFade',
      type: 'boolean',
      title: 'Disbale Fade'
    },
    {
      name: 'heading',
      type: 'string',
      title: 'Heading'
    },
    {
      name: 'content',
      type: 'portableText',
      title: 'Content'
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Background image',
      options: {
        hotspot: true
      }
      // hidden: ({ parent, value }) => !value && parent?.backgroundVideo,
    },
    {
      title: 'Background video',
      name: 'backgroundVideo',
      description: `Background video URL to play inside the hero section. This should be a string
                    value of the video source (Eg. https://youtu.be/JBshChN39y4 ).
                    This video will play ontop on the background image and will not display
                    on mobile.`,
      type: 'string'
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
      ]
    }
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'backgroundImage'
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Hero section',
        media
      }
    }
  }
}
