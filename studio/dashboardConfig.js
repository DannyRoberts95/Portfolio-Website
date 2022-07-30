export default {
    widgets: [
        { name: 'structure-menu' },
        {
            name: 'project-info',
            options: {
                __experimental_before: [],
                data: [
                    {
                        title: 'Frontend vercel URL',
                        value: 'https://vercel.com/aikido-vercel/aikido-marketing',
                        category: 'apps',
                    },
                ],
            },
        },
        {
            name: 'document-list',
            options: {
                title: 'Recently edited',
                order: '_updatedAt desc',
                limit: 10,
                types: ['page'],
            },
            layout: { width: 'medium' },
        },
        { name: 'project-users', layout: { height: 'auto' } },
    ],
};
