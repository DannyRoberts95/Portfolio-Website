import { MdLink } from '@react-icons/all-files/md/MdLink'
import React from 'react'
React.useCallback

export default {
  name: 'navLink',
  type: 'object',
  icon: MdLink,
  title: 'Navigation Link',
  initialValue: { linkType: 'internal' },

  fieldsets: [
    {
      name: 'external',
      title: 'External',
      description: 'This type of link points to a URL outside of the application.',
      hidden: ({ parent }) => parent?.linkType !== 'external'
    },
    {
      title: 'Internal',
      name: 'internal',
      description: 'This type of link points to a page inside of the application.',
      hidden: ({ parent }) => parent?.linkType !== 'internal'
    },
    {
      title: 'Path',
      name: 'path',
      description:
        'This type of link points directy to a page path from the root of the website. This is for specific internal pages that cannot be linked via routes.',
      hidden: ({ parent }) => parent?.linkType !== 'path'
    }
  ],

  fields: [
    {
      name: 'linkType',
      title: 'Item Type',
      type: 'string',
      initialValue: 'internal',
      options: {
        isHighlighted: true,
        list: ['internal', 'path', 'external']
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      hidden: ({ parent }) => parent?.linkType !== 'path' && parent?.linkType !== 'external'
    },
    //External
    {
      name: 'url',
      type: 'url',
      title: 'URL',
      fieldset: 'external',
      validation: Rule =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel']
        })
    },
    //Path

    {
      name: 'path',
      type: 'string',
      description: (
        <p>
          Internal Routes should be used in place of paths where possible. <br />
          Example: "/posts" to points to "wwww.yoursite.com/posts"
        </p>
      ),
      fieldset: 'path'
    },
    //Internal
    {
      name: 'internal',
      type: 'reference',
      to: [{ type: 'route' }, { type: 'post' }],
      fieldset: 'internal'
    }
  ],
  preview: {
    select: {
      external: 'title',
      externalUrl: 'url',
      internal: 'internal.slug.current',
      internalPath: 'path',
      type: 'linkType'
    },

    prepare({ type, external = null, internal = null, externalUrl = null, internalPath = null }) {
      const title = external || internal || internalPath

      const subtitle = () => {
        switch (type) {
          case 'internal':
            return 'Internal Route'
          case 'path':
            return 'Explicit Path'
          case 'external':
            return externalUrl
          default:
            return ''
        }
      }
      return {
        title,
        subtitle: subtitle()
      }
    }
  }
}
