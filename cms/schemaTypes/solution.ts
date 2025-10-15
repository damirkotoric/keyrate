import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'solution',
  title: 'Solution',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'localizedString',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedText',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    
    // SEO Metadata
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      description: 'Custom SEO title and description (defaults to solution hero title and subtitle if not set)',
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
      description: 'URL slug (e.g., "mortgage-preapproval")',
      validation: (Rule) => Rule.required(),
    }),

    // Regions/Locales
    defineField({
      name: 'regions',
      title: 'Available Regions',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Canada', value: 'Canada'},
          {title: 'United Arab Emirates', value: 'UAE'},
          {title: 'United States', value: 'USA'},
        ],
        layout: 'grid',
      },
      description: 'Select which regions this solution is available in. Check all three for global availability.',
      validation: (Rule) => Rule.required().min(1),
    }),

    // Icon
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Icon identifier for this solution (e.g., "FileText", "RefreshCw", "TrendingUp"). Browse icons at https://phosphoricons.com/',
      validation: (Rule) => Rule.required(),
    }),

    // Call to Action Text
    defineField({
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'localizedString',
      description: 'Button text for the solution card (e.g., "Start My Pre-Approval", "Check Renewal Options")',
      validation: (Rule) => Rule.required(),
    }),

    // Form Section
    defineField({
      name: 'formSection',
      title: 'Form Section',
      type: 'object',
      fields: [
        defineField({
          name: 'form',
          title: 'Form Component',
          type: 'string',
          options: {
            list: [
              {title: 'None', value: 'none'},
              {title: 'Pre-Approval Form', value: 'preapproval'},
              {title: 'Renewal Check Form', value: 'renewal'},
              {title: 'Contact Form', value: 'contact'},
              {title: 'Quick Quote Form', value: 'quickquote'},
            ],
            layout: 'dropdown',
          },
          description: 'Select which form to display in this section',
          initialValue: 'none',
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'localizedText',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'benefitsTitle',
          title: 'Benefits List Title',
          type: 'localizedString',
          description: 'e.g., "With a KeyRate pre-approval, you get:"',
        }),
        defineField({
          name: 'benefits',
          title: 'Benefits',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Benefit Text',
                  type: 'localizedText',
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // How It Works Section
    defineField({
      name: 'howItWorks',
      title: 'How It Works Section',
      type: 'object',
      fields: [
        defineField({
          name: 'steps',
          title: 'Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Step Title',
                  type: 'localizedString',
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.max(4),
        }),
      ],
    }),

    // Expert Tips Section
    defineField({
      name: 'expertTips',
      title: 'Our Recommendations Section',
      type: 'object',
      fields: [
        defineField({
          name: 'tips',
          title: 'Tips',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon Name',
                  type: 'string',
                  description: 'Icon identifier (e.g., "Clock", "FileText", "Shield"). Browse icons at https://phosphoricons.com/',
                }),
                defineField({
                  name: 'title',
                  title: 'Tip Title',
                  type: 'localizedString',
                }),
                defineField({
                  name: 'description',
                  title: 'Tip Description',
                  type: 'localizedText',
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // FAQ Section
    defineField({
      name: 'faq',
      title: 'FAQ Section',
      type: 'object',
      fields: [
        defineField({
          name: 'items',
          title: 'FAQ Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'question',
                  title: 'Question',
                  type: 'localizedString',
                }),
                defineField({
                  name: 'answer',
                  title: 'Answer',
                  type: 'localizedText',
                }),
              ],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hero.title',
      slug: 'slug.current',
      regions: 'regions',
    },
    prepare({title, slug, regions}) {
      const pick = (val: any) => val?.en || val?.en_CA || val?.en_US || val?.en_AE || ''
      const regionsList = regions && regions.length > 0 ? regions.join(', ') : 'No regions'
      return {
        title: pick(title) || 'Untitled Solution',
        subtitle: `${slug ? `/${slug}` : 'No slug'} • ${regionsList}`,
      }
    },
  },
})

