import S from '@sanity/desk-tool/structure-builder'

// Anything listed explicitly is filtered so that it is not displayed twice
const hiddenDocTypes = (listItem) =>
  ![
    'route',
    'post',
    'category',
    'person',
    'term',
    'site-config',
    'page',
    'site-navigation',
  ].includes(listItem.getId())

const siteSettingsStructure = S.listItem()
  .title('Page Builder')
  .child(
    S.list()
      // Sets a title for our new list
      .title('Settings Documents')
      // Each will pull one of our new singletons
      .items([
        S.listItem()
          .title('Site Config')
          .schemaType('site-config')
          .child(S.document().id('global-config').schemaType('site-config').title('Site config')),
        S.documentTypeListItem('route').title('Routes'),
        S.listItem()
          .title('Site Navigation')
          .schemaType('site-navigation')
          .child(
            S.document().id('site-navigation').schemaType('site-navigation').title('Navigation')
          ),
        S.documentTypeListItem('page').title('Website Pages'),
      ])
  )
const learnStructure = S.listItem()
  .title('Content')
  .child(
    S.list()
      // Sets a title for our new list
      .title('Content')
      // Each will pull one of our new singletons
      .items([
        S.documentTypeListItem('post').title('Posts'),
        S.documentTypeListItem('person').title('People'),
        S.documentTypeListItem('category').title('Content Categories'),
        // S.documentTypeListItem('term').title('Terms'),
      ])
  )

export default () =>
  S.list()
    .title('Site')
    .items([
      siteSettingsStructure,
      learnStructure,
      ...S.documentTypeListItems().filter(hiddenDocTypes).sort(),
    ])
