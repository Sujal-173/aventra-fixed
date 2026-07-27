import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Aventra content')
    .items([
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('project').title('Portfolio projects'),
      S.divider(),
      S.listItem().title('Blog').child(S.list().title('Blog').items([
        S.documentTypeListItem('post').title('Posts'),
        S.documentTypeListItem('author').title('Authors'),
        S.documentTypeListItem('category').title('Categories'),
      ])),
    ])
