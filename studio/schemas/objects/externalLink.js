export default{
  name: 'externalLink',
  title: 'External Link',
  type: 'object',
  fields: [
      {
          name: 'title',
          title: 'Link title',
          type: 'string',
      },
      {
          name: 'url',
          title: 'External Url',
          type: 'url',
          validation: Rule =>
              Rule.uri({
                  allowRelative: true,
                  scheme: ['https', 'http', 'mailto', 'tel'],
              }),
      },
  ],
}
