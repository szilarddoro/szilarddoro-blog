import clsx from 'clsx'
import {DetailedHTMLProps, HTMLProps} from 'react'

export type ArticleInfoProps = DetailedHTMLProps<
  HTMLProps<HTMLDivElement>,
  HTMLDivElement
>

export default function ArticleInfo({
  className,
  children,
  ...props
}: ArticleInfoProps) {
  return (
    <div
      className={clsx(
        'text-base text-gray-700 dark:text-white dark:text-opacity-70',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
