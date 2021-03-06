import clsx from 'clsx'
import {DetailedHTMLProps, HTMLProps} from 'react'

export type ParagraphProps = DetailedHTMLProps<
  HTMLProps<HTMLParagraphElement>,
  HTMLParagraphElement
>

export default function Paragraph({
  children,
  className,
  ...props
}: ParagraphProps) {
  return (
    <p className={clsx(`leading-relaxed`, className)} {...props}>
      {children}
    </p>
  )
}
