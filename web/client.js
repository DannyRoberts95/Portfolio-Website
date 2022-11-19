import sanityClient from '@sanity/client'

// const isProduction = process.env.VERCEL_ENV === 'production'
const isProduction = process.env.NODE_ENV || 'development'

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION,
  useCdn: isProduction,
})

export default client
