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
    <p className={clsx(`my-2 leading-normal`, className)} {...props}>
      {children}
    </p>
  )
}
