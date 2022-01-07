import type {Entry, Tag} from 'contentful'
import type {AuthorModel} from './author.types'
import type {ImageModel} from './image.types'

/**
 * Represents a post content model.
 */
export type PostModel = {
  id: string
  title: string
  body: string
  slug: string
  description: string
  publishDate: string
  tags: Array<Tag>
  author: Entry<AuthorModel>
  heroImage: Entry<ImageModel>
}
