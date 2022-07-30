import { MdBook } from '@react-icons/all-files/md/MdBook';
// https://fontawesome.com/search?m=free&s=regular

export default {
    name: 'term',
    title: 'Term',
    icon: MdBook,
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Term',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'description',
            title: 'Term Description',
            type: 'portableText',
        },
        {
            name: 'realtedTerms',
            title: 'Related Terms',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'term' } }],

            validation: Rule => Rule.unique(),
        },
    ],

    preview: {
        select: {
            title: 'title',
        },
        prepare(selection) {
            const { title } = selection;
            return {
                title,
            };
        },
    },
};
