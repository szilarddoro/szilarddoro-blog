import type {Entry} from 'contentful'
import type {CloudinaryImageModel} from './image.types'

/**
 * Represents an author content model.
 */
export type AuthorModel<TImage = Array<CloudinaryImageModel>> = {
  id: string
  image: TImage
  name: string
  title: string
  email: string
  shortBio: string
  twitter?: string
  github?: string
}

/**
 * Represents a converted author entry.
 */
export type ConvertedAuthor = Entry<AuthorModel<CloudinaryImageModel>>
