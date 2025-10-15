import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'guide',
  title: 'Guide',
  type: 'document',
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),

    // Subtitle
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localizedText',
      description: 'Brief tagline for the guide',
    }),

    // SEO Metadata
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      description: 'Custom SEO title and description (defaults to guide title and subtitle if not set)',
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
      description: 'URL slug (e.g., "first-time-home-buyer-guide")',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // Cover Image
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
        },
      ],
    }),

    // PDF File
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),

    // Region
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          {title: 'Global', value: 'global'},
          {title: 'Canada', value: 'canada'},
          {title: 'UAE', value: 'uae'},
          {title: 'USA', value: 'usa'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    // Published Date
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'When this guide was published',
      initialValue: () => new Date().toISOString(),
    }),

    // Featured
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this guide in featured sections',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      region: 'region',
      media: 'coverImage',
    },
    prepare({title, region, media}) {
      const pick = (val: any) => val?.en || val?.en_CA || val?.en_US || val?.en_AE || ''
      const regionLabel = region ? region.toUpperCase() : 'No region'
      return {
        title: pick(title) || 'Untitled Guide',
        subtitle: regionLabel,
        media: media,
      }
    },
  },
})

