import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'mortgageGlossary',
  title: 'Mortgage Glossary',
  type: 'document',
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      description: 'Main page title',
      validation: (Rule) => Rule.required(),
    }),

    // Subtitle
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localizedText',
      description: 'Page subtitle or description',
    }),

    // SEO Metadata
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      description: 'Custom SEO title and description (defaults to page title and subtitle if not set)',
      fields: [
        defineField({
          name: 'title',
          title: 'SEO Title',
          type: 'localizedString',
          description: 'Custom page title for search engines. Should be 50-60 characters.',
        }),
        defineField({
          name: 'description',
          title: 'SEO Description',
          type: 'localizedText',
          description: 'Meta description for search engines. Should be 150-160 characters.',
        }),
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),

    // Glossary Terms
    defineField({
      name: 'terms',
      title: 'Glossary Terms',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'term',
              title: 'Term',
              type: 'localizedString',
              description: 'The mortgage term',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'definition',
              title: 'Definition',
              type: 'localizedText',
              description: 'Definition of the term',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              term: 'term',
            },
            prepare({term}) {
              const pick = (val: any) => val?.en || val?.en_CA || val?.en_US || val?.en_AE || ''
              return {
                title: pick(term) || 'Untitled Term',
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Mortgage Glossary Content',
        subtitle: 'List of mortgage terms and definitions',
      }
    },
  },
})

