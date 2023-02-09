import imageWithRelativeUrl from '@/lib/image-with-relative-url'
import {AuthorModel} from '@/types/author.types'
import {CloudinaryImageModel} from '@/types/image.types'

export default function getAuthorWithRelativeImage(
  author: AuthorModel,
): AuthorModel<CloudinaryImageModel> {
  if (!author) {
    return {} as AuthorModel<CloudinaryImageModel>
  }

  return {
    ...author,
    image: imageWithRelativeUrl(author.image[0]),
  }
}
