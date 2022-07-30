import { MdAttachMoney } from '@react-icons/all-files/md/MdAttachMoney';

export default {
    type: 'document',
    name: 'pricePlan',
    title: 'Price Plans',
    icon: MdAttachMoney,
    fields: [
        {
            name: 'planImage',
            type: 'image',
            title: 'Background Image',
        },
        {
            name: 'primary',
            type: 'boolean',
            description: 'Display this plan more prominently',
            title: 'Primary Plan',
          },
          {
            name: 'name',
            type: 'string',
            title: 'Name',
          },
          {
            name: 'header',
            type: 'string',
            title: 'Header',
          },
          {
            name: 'offerTag',
            type: 'string',
            title: 'Offer Tag Text',
            description: 'Displays a badge on the plan with an offer.',
        },
        {
            name: 'monthlyPrice',
            description: 'Including currency symbol. Leave blank for "free" items.',
            type: 'string',
            title: 'Monthly Price',
          },
          {
            name: 'annualPrice',
            description: 'Including currency symbol. Leave blank for "free" items.',
            type: 'string',
            title: 'Annual Price',
        },
        {
            name: 'benifits',
            title: 'Benifits List',
            type: 'array',
            of:[
              {type:"string", name:"benifit",}
            ]
        },
        {
            name: 'cta',
            type: 'cta',
            title: 'Call to Action',
        },
    ],
};
