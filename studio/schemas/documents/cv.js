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
      type: 'illustration'
    },

    // Personal
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      fieldset: 'personal'
    },
    {
      name: 'nationality',
      title: 'Nationality',
      type: 'string',
      fieldset: 'personal'
    },
    {
      name: 'dob',
      title: 'Date of Birth',
      type: 'date',
      fieldset: 'personal'
    },
    //Links
    {
      name: 'links',
      title: 'links',
      type: 'array',
      of: [{ title: 'Weblink', type: 'accordian' }],
      fieldset: 'webLinks'
    },
    //Skills
    {
      title: 'Experienced With',
      name: 'experienced',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'skills'
    },
    {
      title: 'Familiar With',
      name: 'familiar',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'skills'
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
