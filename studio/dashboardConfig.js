export default {
  widgets: [
    // {
    //   name: 'sanity-tutorials',
    //   options: {
    //     templateRepoId: 'sanity-io/sanity-template-nextjs-landing-pages'
    //   }
    // },
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '62e4d066767c75506a545d5e',
                  title: 'Sanity Studio',
                  name: 'portfolio-website-studio-ecpgvbo3',
                  apiId: 'ad0bc816-39b6-4154-be7d-cda40582ee2d'
                },
                {
                  buildHookId: '62e4d067c29a8d4d6053d64d',
                  title: 'Landing pages Website',
                  name: 'portfolio-website-web-ao9zq5ki',
                  apiId: '1ba3487e-9d23-4fbd-b3ea-3cae755b672a'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/DannyRoberts95/Portfolio-Website',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://portfolio-website-web-ao9zq5ki.netlify.app', category: 'apps' }
        ]
      }
    },
    {
      name: 'document-list',
      options: { title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['page'] },
      layout: { width: 'medium' }
    },
    { name: 'project-users', layout: { height: 'auto' } }
  ]
}
