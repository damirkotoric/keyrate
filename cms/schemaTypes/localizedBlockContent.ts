import {defineType} from 'sanity'

const blockConfig = {
  type: 'block',
  styles: [
    {title: 'Normal', value: 'normal'},
    {title: 'H1', value: 'h1'},
    {title: 'H2', value: 'h2'},
    {title: 'H3', value: 'h3'},
    {title: 'H4', value: 'h4'},
    {title: 'Quote', value: 'blockquote'},
  ],
  lists: [
    {title: 'Bullet', value: 'bullet'},
    {title: 'Number', value: 'number'},
  ],
  marks: {
    decorators: [
      {title: 'Strong', value: 'strong'},
      {title: 'Emphasis', value: 'em'},
      {title: 'Code', value: 'code'},
    ],
    annotations: [
      {
        name: 'link',
        type: 'object',
        title: 'Link',
        fields: [
          {
            name: 'href',
            type: 'url',
            title: 'URL',
          },
        ],
      },
    ],
  },
}

const imageConfig = {
  type: 'image',
  options: {hotspot: true},
}

export default defineType({
  name: 'localizedBlockContent',
  title: 'Localized Block Content',
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
      type: 'array',
      of: [blockConfig, imageConfig],
    },
    {
      name: 'en_CA',
      title: 'Canada',
      type: 'array',
      of: [blockConfig, imageConfig],
      fieldset: 'translations',
    },
    {
      name: 'en_AE',
      title: 'UAE',
      type: 'array',
      of: [blockConfig, imageConfig],
      fieldset: 'translations',
    },
    {
      name: 'en_US',
      title: 'USA',
      type: 'array',
      of: [blockConfig, imageConfig],
      fieldset: 'translations',
    },
  ],
})

