import {CodeBlockIcon, DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

const requiredList = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [defineArrayMember({type: 'string'})],
    validation: (rule) => rule.required().min(1),
  })

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: CodeBlockIcon,
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'name'}, validation: (rule) => rule.required()}),
    defineField({name: 'shortDesc', title: 'Short description', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({
      name: 'color',
      title: 'Accent colour',
      type: 'string',
      options: {
        list: [
          {title: 'Violet', value: '#7c3aed'},
          {title: 'Blue', value: '#2563eb'},
          {title: 'Pink', value: '#ec4899'},
          {title: 'Orange', value: '#f97316'},
          {title: 'Teal', value: '#0d9488'},
          {title: 'Cyan', value: '#06b6d4'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {list: ['code', 'search', 'palette', 'megaphone', 'wrench', 'shopping-bag']},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'problem', title: 'Problem', type: 'text', rows: 4, validation: (rule) => rule.required()}),
    defineField({name: 'solution', title: 'Solution', type: 'text', rows: 4, validation: (rule) => rule.required()}),
    requiredList('benefits', 'Benefits'),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'desc', title: 'Description', type: 'text', rows: 3, validation: (rule) => rule.required()}),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    requiredList('technology', 'Technology'),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'stage', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'detail', type: 'string', validation: (rule) => rule.required()}),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    requiredList('deliverables', 'Deliverables'),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'q', title: 'Question', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'a', title: 'Answer', type: 'text', rows: 4, validation: (rule) => rule.required()}),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {select: {title: 'name', subtitle: 'shortDesc'}},
})

export const project = defineType({
  name: 'project',
  title: 'Portfolio project',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'name'}, validation: (rule) => rule.required()}),
    defineField({name: 'client', title: 'Client', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'industry', title: 'Industry', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {list: ['Websites', 'E-commerce', 'SaaS', 'Branding', 'SEO']},
      validation: (rule) => rule.required(),
    }),
    requiredList('services', 'Services provided'),
    defineField({name: 'year', title: 'Year', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'result', title: 'Result', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'overview', title: 'Overview', type: 'text', rows: 4, validation: (rule) => rule.required()}),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string', validation: (rule) => rule.required().warning('Add descriptive alternative text when an image is used.')})],
    }),
    defineField({
      name: 'projectUrl',
      title: 'Live project URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
      description: 'Optional external link shown as “Visit project” on the case study.',
    }),
    defineField({name: 'featured', title: 'Feature on homepage', type: 'boolean', initialValue: false}),
    defineField({name: 'orderRank', title: 'Display order', type: 'number', description: 'Lower numbers appear first.'}),
    defineField({
      name: 'gradient',
      title: 'Card gradient',
      type: 'string',
      description: 'CSS linear-gradient value used by the existing design.',
      options: {
        list: [
          {title: 'Violet → Blue', value: 'linear-gradient(135deg, #7c3aed, #2563eb)'},
          {title: 'Pink → Orange', value: 'linear-gradient(135deg, #ec4899, #f97316)'},
          {title: 'Teal → Cyan', value: 'linear-gradient(135deg, #0d9488, #06b6d4)'},
          {title: 'Slate → Indigo', value: 'linear-gradient(135deg, #334155, #4f46e5)'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'challenge', title: 'Challenge', type: 'text', rows: 5, validation: (rule) => rule.required()}),
    defineField({name: 'solutionText', title: 'Solution', type: 'text', rows: 5, validation: (rule) => rule.required()}),
    requiredList('keyFeatures', 'Key features'),
    requiredList('technologies', 'Technologies'),
  ],
  preview: {select: {title: 'name', subtitle: 'client'}},
})
