export default {
  title: 'Call to action',
  name: 'cta',
  type: 'object',
  validation: Rule =>
    Rule.custom((fields = {}) => !fields.route || !fields.link || 'Only one link type is allowed'),
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Primary',
      description: 'display this CTA more prominently.',
      name: 'isPrimary',
      type: 'boolean'
    },
    {
      title: 'Navigation link',
      name: 'navLink',
      type: 'navLink'
    }
  ],
  preview: {
    select: {
      title: 'title',
      routeTitle: 'route.title',
      slug: 'route.slug.current',
      link: 'link'
    },
    prepare({ title, routeTitle = '', slug, link }) {
      const subtitleExtra = slug ? `Slug:/${slug}/` : link ? `External link: ${link}` : 'Not set'
      return {
        title: `${title}`,
        subtitle: `${routeTitle} ${subtitleExtra}`
      }
    }
  }
}
