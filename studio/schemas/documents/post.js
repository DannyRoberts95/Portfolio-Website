export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fieldsets: [
    {
      title: 'Publishing',
      name: 'publishing'
    },
    {
      title: 'Post Details',
      name: 'details'
    }
  ],
  fields: [
    {
      name: 'publishedAt',
      title: 'Publish Date',
      type: 'datetime',
      fieldset: 'publishing'
    },
    {
      name: 'draft',
      description:
        'Checking this box will prevent the post from being published publically. The post can be previewed by accessing the post URL directly Eg. wwww.yoursite.com/posts/the-slug-of-this-post ',
      title: 'Draft',
      initalValue: false,
      type: 'boolean',
      fieldset: 'publishing'
    },

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
      name: 'illustration',
      title: 'Post Illustration',
      type: 'illustration'
    },
    {
      fieldset: 'details',
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'person' }
    },
    {
      fieldset: 'details',
      name: 'summary',
      title: 'summary',
      type: 'text',
      validation: Rule =>
        Rule.required()
          .min(50)
          .max(150)
    },
    {
      fieldset: 'details',
      name: 'readTime',
      title: 'Read time in minutes',
      type: 'number'
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
      name: 'body',
      description:
        'This is the rich text body of the post where the content for this post will live.',
      title: 'Body',
      type: 'portableText'
    }
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'illustraion.image',
      draft: 'draft'
    },
    prepare(selection) {
      const { author, media, draft } = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}` + `${draft ? ' (Draft)' : ''}`,
        media
      })
    }
  }
}
