/**
 * Represents an image content model of Cloudinary images.
 */
export type CloudinaryImageModel = {
  url: string
  tags: Array<any>
  type: string
  bytes: number
  width: number
  height: number
  format: string
  created_at: string
  version: number
  duration: number
  metadata: Array<any>
  public_id: string
  secure_url: string
  resource_type: string
  original_url: string
  original_secure_url: string
  raw_transformation: string
  relative_url: string
  context: {
    custom: {
      alt: string
      caption: string
    }
  }
}
