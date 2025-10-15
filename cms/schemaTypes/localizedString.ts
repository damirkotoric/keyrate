import {defineType} from 'sanity'

export default defineType({
  name: 'localizedString',
  title: 'Localized String',
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
      type: 'string',
    },
    {
      name: 'en_CA',
      title: 'Canada',
      type: 'string',
      fieldset: 'translations',
    },
    {
      name: 'en_AE',
      title: 'UAE',
      type: 'string',
      fieldset: 'translations',
    },
    {
      name: 'en_US',
      title: 'USA',
      type: 'string',
      fieldset: 'translations',
    },
  ],
})

