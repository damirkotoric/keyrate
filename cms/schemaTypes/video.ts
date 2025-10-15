import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),

    // SEO Metadata
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      description: 'Custom SEO title and description (defaults to video title if not set)',
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
      description: 'URL slug (e.g., "mortgage-preapproval-explained")',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // YouTube URL
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Full YouTube URL (e.g., https://www.youtube.com/watch?v=xxxxx)',
      validation: (Rule) => Rule.required(),
    }),

    // Published Date
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'When the video was published',
      initialValue: () => new Date().toISOString(),
    }),

    // Featured
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this video in featured sections',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      youtubeUrl: 'youtubeUrl',
    },
    prepare({title, youtubeUrl}) {
      const pick = (val: any) => val?.en || val?.en_CA || val?.en_US || val?.en_AE || ''
      return {
        title: pick(title) || 'Untitled Video',
        subtitle: youtubeUrl || 'No URL',
      }
    },
  },
})

