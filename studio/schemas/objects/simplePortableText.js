export default {
    title: 'Simple Portable Text',
    name: 'simplePortableText',
    type: 'array',
    of: [
        {
            title: 'Block',
            type: 'block',
            styles: [{ title: 'caption', value: 'caption' }],
            lists: [],
            marks: {
                decorators: [
                    { title: 'Strong', value: 'strong' },
                    { title: 'Emphasis', value: 'em' },
                ],
                annotations: [
                    { type: 'link' },
                    // { type: 'internalLink' }
                ],
            },
        },
        {
            type: 'embedHTML',
        },
    ],
};
