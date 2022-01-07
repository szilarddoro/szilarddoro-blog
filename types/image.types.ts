/**
 * Represents an image content model.
 */
export type ImageModel = {
  title: string
  description: string
  file: {
    url: string
    filename: string
    contentType: string
    details: {
      size: number
      image: {
        width: number
        height: number
      }
    }
  }
}
