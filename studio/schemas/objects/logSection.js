const logEntry = {
    type: 'object',
    name: 'logEntry',
    title: 'Entry',
    fields: [
        {
            name: 'accordian',
            type: 'accordian',
            title: 'Log Entry',
        },
        {
            name: 'tags',
            title: 'Topic tags',
            type: 'array',
            of: [
                {
                    type: 'string',
                    name: 'tag',
                    validation: Rule =>
                        Rule.required()
                            .min(3)
                            .max(20),
                },
            ],
        },
    ],
    preview: {
        select: {
            title: 'accordian.summary',
        },
        prepare({ title }) {
            return {
                title,
            };
        },
    },
};

const logSection = {
    type: 'object',
    name: 'logSection',
    title: 'Log Section',
    description:
        'A multi-use log component that can be filtered by tags. Useful for pages with many entries like FAQ pages and Technical Issues Pages.',
    fields: [
        {
            name: 'sectionTitle',
            type: 'sectionTitle',
            title: 'Section Title',
        },
        {
            name: 'sectionContent',
            type: 'portableText',
            title: 'Section Content',
        },

        {
            name: 'entries',
            title: 'Entries',
            type: 'array',
            of: [{ type: 'logEntry' }],
        },
    ],
    preview: {
        select: {
            title: 'sectionTitle.heading',
        },
        prepare({ title }) {
            return {
                title,
            };
        },
    },
};

export { logSection, logEntry };
