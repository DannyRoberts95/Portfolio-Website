import { MasterDetailIcon } from '@sanity/icons'

export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  icon: MasterDetailIcon,
  fieldsets: [
    {
      title: 'SEO & metadata',
      name: 'metadata'
    }
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'content',
      type: 'array',
      title: 'Page sections',

      of: [
        {
          title: 'Hero Section',
          description: 'A hero section with a background image/video, subtext and a CTA.',
          type: 'hero'
        },
        {
          title: 'Image Section',
          description: 'Section with a side by side image/ text layout',
          type: 'imageSection'
        },
        { type: 'gridSection' },
        { type: 'textSection' },
        { type: 'reviewSection' },
        { type: 'logSection' },
        { type: 'sketchSection' },
        { type: 'contactSection' }
      ]
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'This description populates meta-tags on the webpage',
      fieldset: 'metadata'
    },
    {
      name: 'openGraphImage',
      type: 'image',
      title: 'Open Graph Image',
      description: 'Image for sharing previews on Facebook, Twitter etc.',
      fieldset: 'metadata'
    }
  ],

  preview: {
    select: {
      title: 'title',
      media: 'openGraphImage'
    }
  }
}
