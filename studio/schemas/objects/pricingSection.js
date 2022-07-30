export default {
    type: 'object',
    name: 'pricingSection',
    title: 'Pricing Section',
    fields: [
        {
            name: 'sectionTitle',
            type: 'sectionTitle',
            title: 'Section Title',
        },

        {
            name: 'plans',
            type: 'array',
            title: 'Plans',
            of: [
                {
                    name: 'plan',
                    type: 'reference',
                    description: 'Select a price plan',
                    to: [
                        {
                            type: 'pricePlan',
                        },
                    ],
                },
            ],
            validation: Rule => [
                Rule.max(3).warning('Are you sure you want more than 3 items?'),
                Rule.unique().error('You have duplicate menu items'),
            ],
        },
    ],
    preview: {
        select: {
            heading: 'sectionTitle.heading',
        },
        prepare({ heading }) {
            return {
                title: `${heading}`,
                subtitle: 'Pricing section',
            };
        },
    },
};
