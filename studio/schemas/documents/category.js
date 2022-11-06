import { FaTag } from '@react-icons/all-files/fa/FaTag'

export default {
  name: 'category',
  title: 'Category',
  icon: FaTag,

  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'color',
      title: 'Color',
      type: 'colorPicker'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    }
  ],
  preview: {
    select: {
      title: 'title'
      // color: 'color'
    },
    prepare(selection) {
      const { title, color = '#000' } = selection
      return {
        title
      }
    }
  }
}
