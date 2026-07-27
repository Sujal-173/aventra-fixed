import type {SchemaTypeDefinition} from 'sanity'
import {author, category, post} from './post'
import {project, service} from './siteContent'

export const schema = {
  types: [post, author, category, service, project] satisfies SchemaTypeDefinition[],
}
