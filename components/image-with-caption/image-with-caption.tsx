import clsx from 'clsx'
import Image, {ImageProps} from 'next/image'

export type ImageWithCaptionProps = ImageProps & {
  /**
   * Caption for the image.
   */
  caption?: string
  /**
   * Class name applied to the caption element.
   */
  captionClassName?: string
  /**
   * Class name applied to the image and caption wrapper.
   */
  wrapperClassName?: string
  /**
   * Class name applied to the image wrapper.
   */
  imageWrapperClassName?: string
}

export default function ImageWithCaption({
  caption,
  captionClassName,
  wrapperClassName,
  imageWrapperClassName,
  src,
  alt,
  ...props
}: ImageWithCaptionProps) {
  return (
    <div className={clsx(`grid gap-2`, wrapperClassName)}>
      <div className={imageWrapperClassName}>
        <Image src={src} alt={alt} {...props} />
      </div>

      {caption && (
        <figcaption
          className={clsx(
            `text-xs text-gray-500 dark:text-gray-300 justify-self-center`,
            captionClassName,
          )}
        >
          {caption}
        </figcaption>
      )}
    </div>
  )
}
