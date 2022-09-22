import { MdWeb } from '@react-icons/all-files/md/MdWeb'

export default {
  name: 'site-navigation',
  type: 'document',
  icon: MdWeb,
  title: 'Site Navigation',
  // https://www.sanity.io/docs/experimental/ui-affordances-for-actions
  __experimental_actions: [/* "create", "delete", */ 'update', 'publish'],
  fields: [
    {
      title: 'Main navigation',
      name: 'mainNavigation',
      description: 'Select pages for the top menu and for the 404 page.',
      validation: Rule => [
        Rule.max(5).warning('Are you sure you want more than 5 items?'),
        Rule.unique().error('You have duplicate menu items')
      ],
      type: 'array',
      of: [
        {
          type: 'navLink'
        },
        {
          type: 'navLinkDropdown'
        }
      ]
    },
    {
      title: 'Navigation CTAs',
      name: 'navigationCTAs',
      description:
        'This CTA list will always appear in the far left of the navbar and on the 404 page.',
      type: 'array',
      of: [{ type: 'cta' }],
      validation: Rule => [
        Rule.max(2).warning('Are you sure you want more than 2 items?'),
        Rule.unique().error('You have duplicate menu items')
      ]
    },
    {
      title: 'Footer navigation',
      name: 'footerNavigation',
      description: 'Select pages for the footer navigation.',
      validation: Rule => [Rule.unique().error('You have duplicate menu items')],
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'column',
          fields: [
            { type: 'string', name: 'columnTitle', title: 'Column Header' },
            {
              type: 'array',
              name: 'links',
              of: [
                {
                  type: 'navLink'
                }
              ]
            }
          ],
          preview: {
            select: { columnTitle: 'columnTitle' },
            prepare({ columnTitle }) {
              return {
                title: columnTitle
              }
            }
          }
        }
      ]
    },
    {
      title: 'Footer Text',
      name: 'footerText',
      type: 'simplePortableText'
    }
  ],
  preview: {
    select: {},
    prepare({ title, subtitle }) {
      return {
        title: 'Site Navigation',
        subTitle: 'Configure Navigation for header and footer.'
      }
    }
  }
}
