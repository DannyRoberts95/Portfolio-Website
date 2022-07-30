export default {
    type: 'object',
    name: 'reviewSection',
    title: 'Review Section',
    fields: [
        {
            name: 'sectionTitle',
            type: 'sectionTitle',
        },
        {
            name: 'reviews',
            title: 'Reviews',
            type: 'array',
            of: [{ type: 'review' }],
        },
    ],
    preview: {
        select: {
            heading: 'sectionTitle.heading',
        },
        prepare({ heading }) {
            return {
                title: `${heading || 'Review Section'}`,
                subtitle: 'Customer Review Section',
            };
        },
    },
};
