import {AuthorModel} from '../../types/author.types'
import {CloudinaryImageModel} from '../../types/image.types'
import imageWithRelativeUrl from '../image-with-relative-url'

export default function getAuthorWithRelativeImage(
  author: AuthorModel,
): AuthorModel<CloudinaryImageModel> {
  return {
    ...author,
    image: imageWithRelativeUrl(author.image[0]),
  }
}
