import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'calculatorPage',
  title: 'Calculator Page',
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
  ],
  preview: {
    prepare() {
      return {
        title: 'Calculator Page Content',
        subtitle: 'CMS fields for the calculator page',
      }
    },
  },
})

