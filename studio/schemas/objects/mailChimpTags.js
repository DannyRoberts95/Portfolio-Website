const mailChimpTag = {
    type: 'object',
    name: 'mailChimpTag',
    title: 'Tag',
    fields: [
        { type: 'string', name: 'tagName', title: 'Name' },
        {
            type: 'string',
            name: 'tagStatus',
            title: 'Status',
            options: {
                isHighlighted: true,
                list: ['active', "inactive"],
                initialValue: 'active',
            },
        },
    ],
    preview: {
      select: {
          title: 'tagName',
          subtitle: 'tagStatus',
      },
      prepare({ subtitle, title }) {
          return {
              title,
              subtitle,
          };
      },
  },
};

const mailchimpTagArray = {
    type: 'array',
    name: 'mailChimpTagArray',
    title: 'Mailchimp Tags',
    of: [{ type: 'mailChimpTag' }],
    preview: {
        select: {
            subtitle: 'mailChimpTagArray',
        },
        prepare({ subtitle }) {
            return {
                title: 'Mailchimp Tag Array',
                subtitle,
            };
        },
    },
};

export { mailChimpTag, mailchimpTagArray };
