import sanityClient from '@sanity/client'

const isProduction = process.env.NODE_ENV === 'production'

const client = sanityClient({
  projectId: '9rg3r6lx',
  dataset: 'production',
  useCdn: isProduction,
  apiVersion: '2022-01-31',
})

export default client
