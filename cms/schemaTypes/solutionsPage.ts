import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'solutionsPage',
  title: 'Solutions Page',
  type: 'document',
  fields: [
    // Hero section
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Hero Title',
          type: 'localizedString',
          description: 'Main headline for the solutions page.',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Hero Subtitle',
          type: 'localizedText',
          description: 'Description under the title explaining KeyRate\'s services.',
        }),
      ],
      preview: {
        select: {title: 'title'},
        prepare({title}) {
          const pick = (val: any) => val?.en || val?.en_CA || val?.en_US || val?.en_AE || ''
          return {title: pick(title) || 'Hero'}
        },
      },
    }),

     // SEO Metadata
     defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      description: 'Custom SEO title and description (defaults to hero title if not set)',
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
        title: 'Solutions Page Content',
        subtitle: 'CMS fields for the solutions page',
      }
    },
  },
})

