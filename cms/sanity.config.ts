import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'keyrate',

  projectId: 'jszqq674',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton pages
            S.listItem()
              .title('Home Page')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
              ),
            S.listItem()
              .title('Solutions Page')
              .child(
                S.document()
                  .schemaType('solutionsPage')
                  .documentId('solutionsPage')
              ),
            S.listItem()
              .title('About Page')
              .child(
                S.document()
                  .schemaType('aboutPage')
                  .documentId('aboutPage')
              ),
            S.listItem()
              .title('Contact Page')
              .child(
                S.document()
                  .schemaType('contactPage')
                  .documentId('contactPage')
              ),
            S.listItem()
              .title('FAQ Page')
              .child(
                S.document()
                  .schemaType('faqPage')
                  .documentId('faqPage')
              ),
            S.listItem()
              .title('Calculator Page')
              .child(
                S.document()
                  .schemaType('calculatorPage')
                  .documentId('calculatorPage')
              ),
            S.listItem()
              .title('Mortgage Glossary')
              .child(
                S.document()
                  .schemaType('mortgageGlossary')
                  .documentId('mortgageGlossary')
              ),
            S.divider(),
            // Collection types
            S.documentTypeListItem('solution').title('Solutions'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.documentTypeListItem('blogPost').title('Blog Posts'),
            S.documentTypeListItem('guide').title('Guides'),
            S.documentTypeListItem('video').title('Videos'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global "Create new document" menu
    templates: (templates) =>
      templates.filter(
        ({schemaType}) =>
          ![
            'homePage',
            'solutionsPage',
            'aboutPage',
            'contactPage',
            'faqPage',
            'calculatorPage',
            'mortgageGlossary',
          ].includes(schemaType)
      ),
  },
})
