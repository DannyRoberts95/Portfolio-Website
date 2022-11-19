import sanityClient from '@sanity/client'

// const isProduction = process.env.VERCEL_ENV === 'production'
const isProduction = process.env.NODE_ENV || 'development'

const client = sanityClient({
  projectId: '9rg3r6lx',
  dataset: 'production',
  apiVersion: '2022-01-31',
  useCdn: isProduction,
})

export default client
