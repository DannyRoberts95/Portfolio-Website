export default {
  name: 'cv',
  title: 'Curriculum vitae',

  type: 'document',
  fieldsets: [
    {
      title: 'Personal Info',
      name: 'personal'
    },
    {
      title: 'Web Links',
      name: 'webLinks'
    },
    {
      title: 'Skills',
      name: 'skills'
    },
    {
      title: 'Sections',
      name: 'sections'
    }
  ],
  fields: [
    {
      name: 'type',
      title: 'CV Type',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'type',
        maxLength: 96
      }
    },
    {
      name: 'illustration',
      title: 'Header Image',
      type: 'figure'
    },
    //Person
    {
      name: 'person',
      title: 'Person',
      type: 'reference',
      to: [{ type: 'person' }]
    },

    //Body
    {
      title: 'Main Section',
      name: 'mainSection',
      type: 'portableText',
      fieldset: 'sections'
    }
  ],
  preview: {
    select: {
      title: 'name',
      type: 'type',
      media: 'illustraion.image'
    },
    prepare(selection) {
      const { title, type, media } = selection
      return Object.assign({}, selection, {
        title: type,
        subtitle: title,
        media
      })
    }
  }
}
