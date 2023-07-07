// sanity.config.js
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import schema from './schemas/schema'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'

export default defineConfig({
  projectId: '9rg3r6lx',
  dataset: 'production',
  title: 'Portfolio-Website',

  plugins: [deskTool(), simplerColorInput()],

  schema: {
    types: schema,
  },
})
