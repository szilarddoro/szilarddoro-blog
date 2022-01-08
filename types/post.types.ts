import type {Entry, EntryCollection, Tag} from 'contentful'
import type {MDXRemoteSerializeResult} from 'next-mdx-remote'
import type {AuthorModel} from './author.types'
import type {CloudinaryImageModel} from './image.types'

/**
 * Represents a raw post content model.
 */
export type PostModel<TImage = Array<CloudinaryImageModel>, TBody = string> = {
  id: string
  title: string
  heroImage: TImage
  body: TBody
  slug: string
  description: string
  publishDate: string
  tags: Array<Tag>
  author: Entry<AuthorModel<TImage>>
}

/**
 * Represents a converted post entry.
 */
export type ConvertedPost<TSerializeResult = Record<string, unknown>> = Entry<
  PostModel<CloudinaryImageModel, MDXRemoteSerializeResult<TSerializeResult>>
>

/**
 * Represents a converted post entry collection.
 */
export type ConvertedPostCollection<
  TSerializeResult = Record<string, unknown>,
> = EntryCollection<
  PostModel<CloudinaryImageModel, MDXRemoteSerializeResult<TSerializeResult>>
>
