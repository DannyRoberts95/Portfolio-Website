import { BsFile } from '@react-icons/all-files/bs/BsFile'

export default {
  name: 'output',
  title: 'Output',
  icon: BsFile,
  type: 'document',
  fieldsets: [
    {
      title: 'Publishing',
      name: 'publishing'
    },
    {
      title: 'Details',
      name: 'details'
    }
  ],
  fields: [
    {
      fieldset: 'details',
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule =>
        Rule.required()
          .min(5)
          .max(50)
    },
    {
      fieldset: 'details',
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      fieldset: 'details',
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [
        {
          name: 'illustration',
          title: 'Post Illustration',
          type: 'illustration'
        }
      ],
      validation: Rule => Rule.unique()
    },

    {
      fieldset: 'details',
      name: 'summary',
      title: 'summary',
      type: 'simplePortableText'
      // validation: Rule => Rule.max(150)
    },
    {
      fieldset: 'details',
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      validation: Rule =>
        Rule.required()
          .min(1)
          .max(3)
          .unique()
    },
    {
      fieldset: 'details',
      name: 'relatedProjects',
      title: 'Related',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'post' } }],
      validation: Rule => Rule.unique()
    }
  ],

  preview: {
    select: {
      title: 'title',
      media: 'illustraion.image'
    }
  }
}
