import {CloudinaryImageModel} from '../../types/image.types'

/**
 * Transforms a Cloudinary image model into a model with relative URL.
 *
 * @param image - Cloudinary image model
 * @returns Cloudinary image model with relative URL
 */
export default function imageWithRelativeUrl(image: CloudinaryImageModel) {
  return {
    ...image,
    relative_url: image.secure_url?.replace(
      /https:\/\/res\.cloudinary\.com\/dtfzsgeku\/image\/upload\/v\d+/i,
      ``,
    ),
  }
}
