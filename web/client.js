import sanityClient from '@sanity/client'

// const isProduction = process.env.VERCEL_ENV === 'production'
const isProduction = process.env.NODE_ENV || 'development'

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.NEXT_PUBLIC_env.SANITY_API_VERSION,
  useCdn: isProduction,
})

export default client
