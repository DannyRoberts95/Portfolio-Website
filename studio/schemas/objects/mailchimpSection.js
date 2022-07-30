export default {
    type: 'object',
    name: 'mailchimpSection',
    title: 'Mailchimp Signup Section',
    fields: [
        {
            name: 'heading',
            type: 'string',
            title: 'Heading',
        },
        {
            name: 'subtitle',
            type: 'string',
            title: 'Subheading',
        },
        { name: 'tags', title: 'Mailchimp Tags', type: 'mailChimpTagArray' },
        {
            name: 'backgroundImage',
            type: 'image',
            title: 'Background image',
        },
    ],
    preview: {
        select: {
            title: 'heading',
        },
        prepare({ title }) {
            return {
                title,
                subtitle: 'Mailchimp newsletter signup section',
            };
        },
    },
};
