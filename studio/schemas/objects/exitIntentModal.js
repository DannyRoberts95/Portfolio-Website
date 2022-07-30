export default {
            title: 'Exit Intent Modal Content',
            name: 'exitIntentModal',
            description:
                'Modal content for the final ditch effort to scrape a conversion from the users cold dead fingers.',
            type: 'object',
            fields: [
                {
                    title: 'Modal Text Header',
                    name: 'modalHeader',
                    type: 'string',
                },
                {
                    title: 'Modal Text Content',
                    name: 'modalText',
                    type: 'simplePortableText',
                    description:
                        "Keep it short and sweet here. They're already leaving an a wall of text won't help keep them here.",
                },
                {
                    title: 'Modal Image',
                    description: 'This image will be displayed at 3:4 and at 16:9 aspect ratio.',
                    name: 'modalImage',
                    type: 'image',
                },
            ],
        }
