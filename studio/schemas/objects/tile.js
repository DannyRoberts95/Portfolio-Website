export default {
  type: 'object',
  name: 'tile',
  title: 'Tile',
  fields: [
      {
          type: 'string',
          name: 'description',
          description:
              "What's in this tile? Internal use only to preview content.",
          title: 'Tile Description',
      },
      {
          type: 'portableText',
          name: 'tileContent',
          title: 'Tile Content',
      },
  ],
  preview: {
      select: {
          title: 'description',
      },
      prepare({ title }) {
          return {
              title,
          };
      },
  },
}
