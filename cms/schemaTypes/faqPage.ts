import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'faqPage',
  title: 'FAQ Page',
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

    // Slug for URL
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL slug (e.g., "faq")',
      validation: (Rule) => Rule.required(),
    }),

    // FAQs
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'localizedString',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'localizedBlockContent',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              question: 'question',
            },
            prepare({question}) {
              const pick = (val: any) => val?.en || val?.en_CA || val?.en_US || val?.en_AE || ''
              return {
                title: pick(question) || 'Untitled FAQ',
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
        title: 'FAQ Page Content',
        subtitle: 'Frequently Asked Questions',
      }
    },
  },
})

