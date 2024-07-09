import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'
import "./styling/styling.css"
import {structure} from './structure'
import {hierarchicalDocumentList} from '@sanity/hierarchical-document-list'
import {documentInternationalization} from '@sanity/document-internationalization'
import {templates} from './templates'
import {locales} from './locales'
export default defineConfig({
  name: 'default',
  title: 'Sanity POC',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [
    structureTool({structure}),
    visionTool(),
    vercelDeployTool(),
    hierarchicalDocumentList(),
    documentInternationalization({
      // Required configuration
      supportedLanguages: locales,
      schemaTypes: ['page', 'externalLink'],
    })
  ],
  document: {
    newDocumentOptions: (prev, { currentUser, creationContext }) => {
      const { type, schemaType } = creationContext;
      if (type === 'global') {
        return prev.filter((template) =>
          (
            template.templateId !== 'page' && 
            template.templateId !== 'hierarchy.tree' &&
            template.templateId !== 'externalLink' &&
            template.templateId !== 'translation.metadata'
          )
        );
      }
      return prev;
    },
  },

  schema: {
    types: schemaTypes,
    templates: (prev)=> templates(prev)
  }
})
