import { BsFiles } from '@react-icons/all-files/bs/BsFiles';

export default {
    name: 'collection',
    title: 'Collection',
    icon: BsFiles,
    type: 'document',
    fieldsets: [
        {
            title: 'Publishing',
            name: 'publishing',
        },
        {
            title: 'Collection Details',
            name: 'details',
        },
    ],
    fields: [
        {
            name: 'publishedAt',
            title: 'Publish Date',
            type: 'datetime',
            fieldset: 'publishing',
        },
        {
            name: 'draft',
            description:
                'Checking this box will prevent the post from being published publically. The post can be previewed by accessing the post URL directly.',
            title: 'Draft',
            initalValue: false,
            type: 'boolean',
            fieldset: 'publishing',
        },
        {
            fieldset: 'details',
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule =>
                Rule.required()
                    .min(5)
                    .max(50),
        },
        {
            fieldset: 'details',
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            fieldset: 'details',
            name: 'summary',
            title: 'summary',
            type: 'text',
            validation: Rule =>
                Rule.required()
                    .min(50)
                    .max(200),
        },
        {
            fieldset: 'details',
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }],
        },
        {
            fieldset: 'details',
            title: 'Illustration',
            name: 'illustration',
            type: 'illustration',
        },

        {
            name: 'posts',
            title: 'Collection Posts',
            description:
                'This is the list of posts that will make up this collection. They should be ordered sequentially and be relevant to the overall theme of the collection. ',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'post' } }],
            validation: Rule => Rule.unique(),
        },
    ],

    preview: {
        select: {
            title: 'title',
            media: 'illustration.image',
            posts: 'posts',
        },
        prepare(selection) {
            const { posts, title, media } = selection;
            return {
                title,
                media,
                subtitle: `${posts.length} Posts`,
            };
        },
    },
};
