export default {
    name: 'figure',
    title: 'Image',
    type: 'image',
    options: {
        hotspot: true,
    },

    fields: [
        {
            title: 'Aspect Ration',
            name: 'aspectRatio',
            description: 'What aspect ratio should the image be displayed at?',
            type: 'string',
            options: {
                isHighlighted: true,
                list: ['16/9', '1/1', '3/4', '4/3'],
                initialValue: '16/9',
            },
            validation: Rule => Rule.required(),
        },
        {
            title: 'Caption (Optional)',
            name: 'caption',
            type: 'string',
            options: {
                isHighlighted: true,
            },
        },

        {
            name: 'alt',
            type: 'string',
            title: 'Alternative text',
            description: 'Important for SEO and accessiblity.',
            options: {
                isHighlighted: true,
            },
        },
    ],
    preview: {
        select: {
            imageUrl: 'asset.url',
            title: 'alt',
        },
    },
};
