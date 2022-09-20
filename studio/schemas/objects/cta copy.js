export default {
  title: 'Call to action',
  name: 'cta',
  type: 'object',
  validation: Rule =>
    Rule.custom(
      (fields = {}) =>
        !fields.route || !fields.link || 'Only one link type is allowed'
    ),
  fieldsets: [
    {
      title: 'Link',
      name: 'link',
    },
  ],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Primary',
      description: 'display this CTA more prominently.',
      name: 'isPrimary',
      type: 'boolean',
    },
    {
      title: 'Internal link',
      description: 'Use this to link between internal pages on the website',
      name: 'route',
      type: 'reference',
      to: [{ type: 'route' }],
      fieldset: 'link',
      hidden: ({ parent, value }) => !value && parent?.link
    },
    {
      title: 'External link',
      description: 'Use this to link to external pages on other sites. Make sure the url is not broken.',
      name: 'link',
      type: 'url',
      fieldset: 'link',
      hidden: ({ parent, value }) => !value && parent?.route
    },
  ],
  preview: {
    select: {
      title: 'title',
      routeTitle: 'route.title',
      slug: 'route.slug.current',
      link: 'link',
    },
    prepare({ title, routeTitle = '', slug, link }) {
      const subtitleExtra = slug
        ? `Slug:/${slug}/`
        : link
        ? `External link: ${link}`
        : 'Not set';
      return {
        title: `${title}`,
        subtitle: `${routeTitle} ${subtitleExtra}`,
      };
    },
  },
};
