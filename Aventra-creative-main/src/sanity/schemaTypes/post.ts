import {DocumentTextIcon, TagIcon, UserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const author = defineType({
  name: 'author', title: 'Author', type: 'document', icon: UserIcon,
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'name'}, validation: (rule) => rule.required()}),
    defineField({name: 'bio', title: 'Bio', type: 'text', rows: 3}),
    defineField({name: 'image', title: 'Portrait', type: 'image', options: {hotspot: true}}),
  ],
  preview: {select: {title: 'name', media: 'image'}},
})

export const category = defineType({
  name: 'category', title: 'Category', type: 'document', icon: TagIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
  ],
  preview: {select: {title: 'title'}},
})

export const post = defineType({
  name: 'post', title: 'Post', type: 'document', icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required(), group: 'content'}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title', maxLength: 96}, validation: (rule) => rule.required(), group: 'content'}),
    defineField({name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, validation: (rule) => rule.required().max(220), group: 'content'}),
    defineField({name: 'author', title: 'Author', type: 'reference', to: [{type: 'author'}], validation: (rule) => rule.required(), group: 'content'}),
    defineField({name: 'category', title: 'Category', type: 'reference', to: [{type: 'category'}], validation: (rule) => rule.required(), group: 'content'}),
    defineField({name: 'publishedAt', title: 'Published at', type: 'datetime', validation: (rule) => rule.required(), group: 'content'}),
    defineField({name: 'mainImage', title: 'Main image', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string', validation: (rule) => rule.required()})], group: 'content'}),
    defineField({name: 'body', title: 'Article body', type: 'array', of: [defineArrayMember({type: 'block', marks: {annotations: [defineArrayMember({name: 'link', title: 'Link', type: 'object', fields: [defineField({name: 'href', title: 'URL', type: 'url', validation: (rule) => rule.required()}), defineField({name: 'blank', title: 'Open in new tab', type: 'boolean', initialValue: false})]})]}}), defineArrayMember({type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string', validation: (rule) => rule.required()})]})], validation: (rule) => rule.required().min(1), group: 'content'}),
    defineField({name: 'seo', title: 'SEO', type: 'object', group: 'seo', fields: [defineField({name: 'title', title: 'SEO title', type: 'string', validation: (rule) => rule.max(60).warning('Keep it under 60 characters')}), defineField({name: 'description', title: 'SEO description', type: 'text', rows: 3, validation: (rule) => rule.max(160).warning('Keep it under 160 characters')})]}),
    defineField({name: 'date', title: 'Legacy publish date', type: 'date', readOnly: true, hidden: ({value}) => value === undefined, deprecated: {reason: 'Use Published at instead.'}}),
    defineField({name: 'readTime', title: 'Legacy read time', type: 'string', readOnly: true, hidden: ({value}) => value === undefined, deprecated: {reason: 'This can be derived from the article body.'}}),
    defineField({name: 'gradient', title: 'Legacy card gradient', type: 'string', readOnly: true, hidden: ({value}) => value === undefined, deprecated: {reason: 'Use Main image instead.'}}),
    defineField({name: 'content', title: 'Legacy content', type: 'array', of: [defineArrayMember({type: 'text'})], readOnly: true, hidden: ({value}) => value === undefined, deprecated: {reason: 'Use Article body instead.'}}),
  ],
  preview: {select: {title: 'title', subtitle: 'publishedAt', media: 'mainImage'}},
})
