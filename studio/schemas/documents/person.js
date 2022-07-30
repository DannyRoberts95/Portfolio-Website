import { MdSupervisorAccount } from '@react-icons/all-files/md/MdSupervisorAccount';

export default {
    name: 'person',
    title: 'Person',
    type: 'document',
    icon: MdSupervisorAccount,
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },

        {
            name: 'bio',
            title: 'Bio',
            type: 'portableText',
        },
    ],
};
