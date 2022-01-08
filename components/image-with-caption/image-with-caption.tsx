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
   * Class name applied to the image wrapper.
   */
  wrapperClassName?: string
}

export default function ImageWithCaption({
  caption,
  captionClassName,
  wrapperClassName,
  src,
  alt,
  ...props
}: ImageWithCaptionProps) {
  return (
    <div className={clsx(`grid gap-2`, wrapperClassName)}>
      <Image src={src} alt={alt} {...props} />

      {caption && (
        <figcaption
          className={clsx(
            `text-xs text-gray-500 justify-self-center`,
            captionClassName,
          )}
        >
          {caption}
        </figcaption>
      )}
    </div>
  )
}
