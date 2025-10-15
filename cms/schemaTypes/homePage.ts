import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    // Hero section
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({
          name: 'kicker',
          title: 'Kicker',
          type: 'localizedString',
          description: 'Small badge above the main headline (e.g., Award-Winning Brokerage).',
        }),
        defineField({
          name: 'headline',
          title: 'Hero Headline',
          type: 'localizedText',
          description:
            'Main multi-line headline. Use line breaks to control lines (Shift+Enter). Red highlight is handled in code.',
        }),
        defineField({
          name: 'subheadline',
          title: 'Hero Subheadline',
          type: 'localizedText',
          description:
            'Short paragraph under the headline describing value prop.',
        }),
      ],
      preview: {
        select: {headline: 'headline'},
        prepare({headline}) {
          const pick = (val: any) => val?.en || val?.en_CA || val?.en_US || val?.en_AE || ''
          const title = pick(headline) || 'Hero'
          return {title}
        },
      },
    }),

    // SEO Metadata
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      description: 'Custom SEO title and description for the home page',
      fields: [
        defineField({
          name: 'title',
          title: 'SEO Title',
          type: 'localizedString',
          description: 'Custom page title for search engines (defaults to site title if not set). Should be 50-60 characters.',
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
        collapsed: false,
      },
    }),

    // Solutions section
    defineField({
      name: 'solutions',
      title: 'Solutions Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'localizedText',
        }),
      ],
      preview: {
        select: {title: 'title'},
        prepare({title}) {
          const pick = (val: any) => val?.en || val?.en_CA || val?.en_US || val?.en_AE || ''
          return {title: pick(title) || 'Solutions'}
        },
      },
    }),
 
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page Content',
        subtitle: 'CMS fields for the homepage',
      }
    },
  },
})


