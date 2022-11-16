// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import cv from './documents/cv'
import navigation from './documents/navigation'
import output from './documents/output'
import page from './documents/page'
import route from './documents/route'
import siteConfig from './documents/siteConfig'

// Object types
import cta from './objects/cta'
import figure from './objects/figure'
import internalLink from './objects/internalLink'
import link from './objects/link'
import navigationLink from './objects/navLink'
import pagePortableText from './objects/pagePortableText'
import portableText from './objects/portableText'
import simplePortableText from './objects/simplePortableText'
//Learn Components
import category from './documents/category'
import collection from './documents/collection'
import person from './documents/person'
import post from './documents/post'
//Glossary
import term from './documents/term'

// Page sections
import contactSection from './objects/contactSection'
import gridSection from './objects/gridSection'
import hero from './objects/hero'
import imageSection from './objects/imageSection'
import reviewSection from './objects/reviewSection'

import textSection from './objects/textSection'

//post
import accordian from './objects/accordian'
import illustration from './objects/illustration'

import { embedCodeSnippet, embedHTML, embedVideo } from './objects/embeds'
import exitIntentModal from './objects/exitIntentModal'
import externalLink from './objects/externalLink'
import figureList from './objects/figureList'
import logos from './objects/logos'
import { logEntry, logSection } from './objects/logSection'
import review from './objects/review'
import sectionTitle from './objects/sectionTitle'
import tile from './objects/tile'

import navLinkDropdown from './objects/navLinkDropdown'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    illustration,
    figureList,
    navigationLink,
    navLinkDropdown,
    navigation,
    cta,
    output,
    embedHTML,
    embedVideo,
    embedCodeSnippet,
    figure,
    hero,
    imageSection,
    gridSection,
    tile,
    logSection,
    logEntry,
    reviewSection,
    review,
    internalLink,
    externalLink,
    exitIntentModal,
    logos,
    link,
    contactSection,
    sectionTitle,
    accordian,
    page,
    portableText,
    pagePortableText,
    route,
    simplePortableText,
    siteConfig,
    textSection,
    category,
    person,
    post,
    cv,
    collection,
    term
  ])
})
