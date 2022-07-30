export default {
    type: 'object',
    name: 'imageSection',
    title: 'Image with text',
    fields: [
        {
            name: 'sectionTitle',
            title: 'Section Title',
            type: 'sectionTitle',
        },
        {
            name: 'text',
            type: 'portableText',
            title: 'Text',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'figure',
        },
        {
            name: 'cta',
            type: 'cta',
            title: 'Call to action',
        },
        {
            title: 'Reverse Layout',
            name: 'reversed',
            description: 'Reverse the layout so the image appears before the text.',
            type: 'boolean',
        },
        {
            title: 'Elevate',
            name: 'elevateImage',
            description:
                'Display the image with a slight elevation. Disable this is the image has transparancy.',
            type: 'boolean',
        },
    ],
    preview: {
        select: {
            heading: 'sectionTitle.heading',
            subtitle: 'label',
            media: 'image',
        },
        prepare({ heading, media }) {
            return {
                title: `Image: ${heading}`,
                subtitle: 'Image section',
                media,
            };
        },
    },
};
