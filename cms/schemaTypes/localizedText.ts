import {defineType} from 'sanity'

export default defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fieldsets: [
    {
      name: 'translations',
      title: 'Translations',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      name: 'en',
      title: 'Global',
      type: 'text',
      rows: 3,
    },
    {
      name: 'en_CA',
      title: 'Canada',
      type: 'text',
      rows: 3,
      fieldset: 'translations',
    },
    {
      name: 'en_AE',
      title: 'UAE',
      type: 'text',
      rows: 3,
      fieldset: 'translations',
    },
    {
      name: 'en_US',
      title: 'USA',
      type: 'text',
      rows: 3,
      fieldset: 'translations',
    },
  ],
})

