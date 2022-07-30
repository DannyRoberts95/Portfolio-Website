import { MdList } from '@react-icons/all-files/md/MdList'

export default {
  name: 'Navigation Link',
  name: 'navLinkDropdown',
  type: 'object',
  icon: MdList,
  fields: [
    {
      name: 'baseLink',
      title: 'Base Link',
      type: 'navLink',
      description: 'This is the base link from which the dropdown will appear. '
    },
    {
      name: 'childLinks',
      title: 'Dropdown Items',
      description:
        'This is the list of links that will appear in the dropdown menu. These links may be internal or external.',
      type: 'array',
      of: [{ type: 'navLink' }]
    }
  ],
  preview: {
    select: {
      external: 'baseLink.title',
      internal: 'baseLink.internal.slug.current'
    },
    prepare({ external = null, internal = null }) {
      return {
        title: external || internal,
        subtile: 'Dropdown Menu'
      }
    }
  }
}
