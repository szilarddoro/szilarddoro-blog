import {DetailedHTMLProps, HTMLProps} from 'react'
import {twMerge} from 'tailwind-merge'

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
    <p className={twMerge(`leading-relaxed`, className)} {...props}>
      {children}
    </p>
  )
}
