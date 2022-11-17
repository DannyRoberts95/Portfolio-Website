module.exports = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  webpack: (config, {isServer}) => {
    if (isServer) {
      require('./scripts/generate-sitemap')
    }
    return config
  },
}
