import { MdSupervisorAccount } from '@react-icons/all-files/md/MdSupervisorAccount'

export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  icon: MdSupervisorAccount,
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
      title: 'Current Interests',
      name: 'currentInterests'
    }
  ],
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      fieldset: 'personal'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      fieldset: 'personal',
      options: {
        source: 'name',
        maxLength: 96
      }
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
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      fieldset: 'personal'
    },
    {
      name: 'phone',
      title: 'phone',
      type: 'string',
      fieldset: 'personal'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      fieldset: 'personal',
      options: {
        hotspot: true
      }
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
    {
      title: 'Other Skill',
      name: 'otherSklls',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'skills'
    },
    //Links
    {
      name: 'links',
      title: 'links',
      type: 'array',
      of: [{ title: 'Weblink', type: 'accordian' }],
      fieldset: 'webLinks'
    },
    // Currently
    {
      name: 'currentlyReading',
      title: 'Reading',
      type: 'string',
      fieldset: 'currentInterests'
    },
    {
      name: 'currentlyWatching',
      title: 'Watching',
      type: 'string',
      fieldset: 'currentInterests'
    },
    {
      name: 'currentlyBuilding',
      title: 'Building',
      type: 'string',
      fieldset: 'currentInterests'
    },
    // Bio
    {
      name: 'bio',
      title: 'Bio',
      type: 'portableText'
    }
  ]
}
