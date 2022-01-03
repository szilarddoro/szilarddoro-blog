import clsx from 'clsx'
import {DetailedHTMLProps, HTMLProps} from 'react'

export type LayoutProps = DetailedHTMLProps<
  HTMLProps<HTMLDivElement>,
  HTMLDivElement
>

export default function Layout({children, className, ...props}: LayoutProps) {
  return (
    <div
      className={clsx(`container max-w-3xl mx-auto py-8`, className)}
      {...props}
    >
      {children}
    </div>
  )
}
