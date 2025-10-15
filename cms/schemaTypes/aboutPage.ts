import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
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
          title: 'Hero Title',
          type: 'localizedString',
          description: 'Main hero headline',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          description: 'Hero background image',
        }),
      ],
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

    // Founder Section
    defineField({
      name: 'founder',
      title: 'Founder Section',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Founder Image',
          type: 'image',
          description: 'Photo of the founder',
        }),
        defineField({
          name: 'role',
          title: 'Role/Title',
          type: 'localizedString',
          description: 'e.g., "Principal Broker & CEO"',
        }),
        defineField({
          name: 'name',
          title: 'Name',
          type: 'localizedString',
        }),
        defineField({
          name: 'awardsImage',
          title: 'Awards Image',
          type: 'image',
          description: 'Image showing awards and accolades',
        }),
        defineField({
          name: 'bio',
          title: 'Biography',
          type: 'localizedBlockContent',
          description: 'Biography content with rich text formatting',
        }),
        defineField({
          name: 'primaryCtaText',
          title: 'Primary CTA Text',
          type: 'localizedString',
          description: 'e.g., "Book a Call"',
        }),
        defineField({
          name: 'primaryCtaUrl',
          title: 'Primary CTA URL',
          type: 'string',
        }),
        defineField({
          name: 'secondaryCtaText',
          title: 'Secondary CTA Text',
          type: 'localizedString',
          description: 'e.g., "Connect on LinkedIn"',
        }),
        defineField({
          name: 'secondaryCtaUrl',
          title: 'Secondary CTA URL',
          type: 'string',
        }),
      ],
    }),

    // Who We Are Section
    defineField({
      name: 'whoWeAre',
      title: 'Who We Are Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'localizedBlockContent',
          description: 'Rich text content for this section',
        }),
      ],
    }),

    // What Makes Us Different Section
    defineField({
      name: 'whatMakesUsDifferent',
      title: 'What Makes Us Different Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
        }),
        defineField({
          name: 'items',
          title: 'Feature Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon Name',
                  type: 'string',
                  description: 'Icon identifier (e.g., "Users", "TrendingUp", "CheckCircle", "Eye", "Heart", "Shield", "Globe", "BookOpen"). Browse icons at https://phosphoricons.com/',
                }),
                defineField({
                  name: 'title',
                  title: 'Feature Title',
                  type: 'localizedString',
                }),
                defineField({
                  name: 'description',
                  title: 'Feature Description',
                  type: 'localizedText',
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.max(8),
        }),
      ],
    }),

    // Why Use Us Section
    defineField({
      name: 'whyUseUs',
      title: 'Why Use Us Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
        }),
        defineField({
          name: 'intro',
          title: 'Introduction',
          type: 'localizedBlockContent',
        }),
        defineField({
          name: 'comparisonTitle',
          title: 'Comparison Subsection Title',
          type: 'localizedString',
          description: 'e.g., "Mortgage brokers vs. Banks: What\'s the difference?"',
        }),
        defineField({
          name: 'comparisonDescription',
          title: 'Comparison Description',
          type: 'localizedBlockContent',
        }),
      ],
    }),

    // Comparison Table
    defineField({
      name: 'comparisonTable',
      title: 'Comparison Table',
      type: 'object',
      fields: [
        defineField({
          name: 'rows',
          title: 'Table Rows',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'aspect',
                  title: 'Aspect',
                  type: 'localizedString',
                  description: 'e.g., "Market Share", "Description", etc.',
                }),
                defineField({
                  name: 'bankValue',
                  title: 'Bank Value',
                  type: 'localizedText',
                }),
                defineField({
                  name: 'brokerValue',
                  title: 'Broker Value',
                  type: 'localizedText',
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Growing Popularity Section
    defineField({
      name: 'growingPopularity',
      title: 'Growing Popularity Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'localizedBlockContent',
          description: 'Rich text content for this section',
        }),
      ],
    }),

    // Key Advantages Section
    defineField({
      name: 'keyAdvantages',
      title: 'Key Advantages Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
        }),
        defineField({
          name: 'advantages',
          title: 'Advantages List',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Advantage Text',
                  type: 'localizedText',
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Lender Partners Section
    defineField({
      name: 'lenderPartners',
      title: 'Lender Partners Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'localizedText',
        }),
        defineField({
          name: 'partners',
          title: 'Partners',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Partner Name',
                  type: 'string',
                }),
                defineField({
                  name: 'logo',
                  title: 'Logo',
                  type: 'image',
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Get Started Section
    defineField({
      name: 'getStarted',
      title: 'Get Started Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page Content',
        subtitle: 'CMS fields for the about page',
      }
    },
  },
})

