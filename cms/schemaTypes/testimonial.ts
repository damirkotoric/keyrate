import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'localizedText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorTitle',
      title: 'Author Title',
      type: 'localizedString',
      description: 'e.g., First Time Home Buyers',
    }),
  ],
  preview: {
    select: {
      authorName: 'authorName.en',
      authorTitle: 'authorTitle.en',
      quote: 'quote.en',
    },
    prepare({authorName, authorTitle, quote}) {
      return {
        title: authorName || 'Untitled',
        subtitle: authorTitle || '',
        description: quote ? quote.substring(0, 100) + (quote.length > 100 ? '...' : '') : '',
      }
    },
  },
})


