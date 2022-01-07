import type {Entry} from 'contentful'
import type {ImageModel} from './image.types'

/**
 * Represents an author content model.
 */
export type AuthorModel = {
  id: string
  image: Entry<ImageModel>
  name: string
  title: string
  email: string
  shortBio: string
  twitter?: string
  github?: string
}
