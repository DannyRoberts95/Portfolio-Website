import { MdSettings } from '@react-icons/all-files/md/MdSettings'
import bcp47 from 'bcp47'

export default {
  name: 'site-config',
  type: 'document',
  icon: MdSettings,
  title: 'Site configuration',
  // https://www.sanity.io/docs/experimental/ui-affordances-for-actions
  // __experimental_actions: [/* "create", "delete", */ 'update', 'publish'],
  fieldsets: [
    { name: 'config', title: 'Configuration' },
    { name: 'embeds', title: 'Site Tracking and Embeds' }
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Site title'
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url',
      description: 'The main site url. Used to create canonical url'
    },
    {
      name: 'frontpage',
      type: 'reference',
      description: 'Choose page to be the frontpage',
      to: { type: 'page' }
    },
    {
      title: 'Site language',
      description: 'Should be a valid bcp47 language code like en, en-US, no or nb-NO',
      name: 'lang',
      type: 'string',
      validation: Rule =>
        Rule.custom(lang => (bcp47.parse(lang) ? true : 'Please use a valid bcp47 code'))
    },

    {
      title: 'Hide Cookie Banner',
      description: 'Hide and show the cookie banner.',
      name: 'disableCookieBanner',
      type: 'boolean',
      initialValue: false
    },

    {
      title: 'Brand Logos',
      name: 'logos',
      description: 'Upload SVG files for best results.',
      type: 'logos'
    }
  ]
}
