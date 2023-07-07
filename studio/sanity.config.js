// sanity.config.js
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'
import { deskTool } from 'sanity/desk'
import schema from './schemas/schema'

export default defineConfig({
  projectId: '9rg3r6lx',
  dataset: 'production',
  title: 'Portfolio-Website',

  plugins: [deskTool(), simplerColorInput(), visionTool()],
  tools: (prev) => {
    // 👇 Uses environment variables set by Vite in development mode
    if (import.meta.env.DEV) {
      return prev
    }
    return prev.filter((tool) => tool.name !== 'vision')
  },
  schema: {
    types: schema,
  },

  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => templateItem.templateId != 'site-config')
      }
      return prev
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === 'site-config') {
        return prev.filter(({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action))
      }
      return prev
    },
  },
})
