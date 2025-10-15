import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),

    // Summary
    defineField({
      name: 'subtitle',
      title: 'Summary',
      type: 'localizedString',
      description: 'Brief description or tagline for the blog post',
    }),

    // SEO Metadata
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      description: 'Custom SEO title and description (defaults to post title and summary if not set)',
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
      description: 'URL slug (e.g., "understanding-mortgage-rates")',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // Cover Photo
    defineField({
      name: 'coverPhoto',
      title: 'Cover Photo',
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
      validation: (Rule) => Rule.required(),
    }),

    // Category
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'News', value: 'news'},
          {title: 'Videos', value: 'videos'},
          {title: 'Buying Tips', value: 'buying-tips'},
          {title: 'Investing', value: 'investing'},
          {title: 'Rates', value: 'rates'},
          {title: 'Case Studies', value: 'case-studies'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
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

    // Rich Content
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localizedBlockContent',
      description: 'The main content of the blog post',
      validation: (Rule) => Rule.required(),
    }),

    // Published Date
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'When the blog post was published',
      initialValue: () => new Date().toISOString(),
    }),

    // Author (optional, for future use)
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Author name (optional)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      region: 'region',
      media: 'coverPhoto',
    },
    prepare({title, category, region, media}) {
      const pick = (val: any) => val?.en || val?.en_CA || val?.en_US || val?.en_AE || ''
      const categoryLabel = category ? category.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) : 'No category'
      const regionLabel = region ? region.toUpperCase() : 'No region'
      return {
        title: pick(title) || 'Untitled Blog Post',
        subtitle: `${categoryLabel} • ${regionLabel}`,
        media: media,
      }
    },
  },
})

