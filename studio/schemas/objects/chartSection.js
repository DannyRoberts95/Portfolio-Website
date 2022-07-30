export default {
    type: 'object',
    name: 'chartSection',
    title: 'Return Chart Section',
    description:
        'This section renderd a chart that visualises Aikido strategy returns based on the "Top quality high momentum" strategy. The user can enter their own inital investment into the chart.',
    fields: [

        {
            title: 'Section Title',
            name: 'sectionTitle',
            type: 'sectionTitle',
        },
        {
            title: 'Strategy Name',
            name: 'name',
            type: 'string',
        },
        {
            title: 'Inital Investment',
            name: 'initialInvestment',
            type: 'number',
            initialValue: 10000,
        },
    ],
    preview: {
        select: {
            title: 'sectionTitle.heading',
            subtitle: 'initialInvestment',
        },
        prepare({ title, subtitle }) {
            return {
                title,
                subtitle,
            };
        },
    },
};
