import clsx from 'clsx'
import Link from 'next/link'
import type {DetailedHTMLProps, HTMLProps} from 'react'
import type {ConvertedPost} from '../../types/post.types'

export type ArticleInfoProps<TBody> = DetailedHTMLProps<
  HTMLProps<HTMLDivElement>,
  HTMLDivElement
> & {
  /**
   * Post data used to display metadata.
   */
  post: ConvertedPost<TBody>
  /**
   * Determines whether the author is being displayed or not.
   */
  hideAuthor?: boolean
}

export default function ArticleInfo<TBody>({
  className,
  children,
  post,
  hideAuthor,
  ...props
}: ArticleInfoProps<TBody>) {
  return (
    <div
      className={clsx(
        'text-base text-gray-700 dark:text-white dark:text-opacity-70',
        className,
      )}
      {...props}
    >
      {children}

      <div>
        {!hideAuthor && (
          <>
            <span>{post.fields.author.fields.name}</span>
            <span> · </span>
          </>
        )}

        <span>
          {new Intl.DateTimeFormat(post.sys.locale).format(
            new Date(post.sys.createdAt),
          )}
        </span>
        <span> · </span>
        {post.fields.readingTime < 5 && <span>☕</span>}
        {post.fields.readingTime >= 5 && post.fields.readingTime < 10 && (
          <span>☕☕</span>
        )}
        {post.fields.readingTime >= 10 && <span>☕☕☕</span>}
        <span className="ml-1">{post.fields.readingTime} perc</span>
        <span> · </span>
        <div className="inline-grid grid-flow-col gap-1.5">
          {post.fields.tags.map(tag => (
            <Link
              href={`/categories/${tag.sys.id}`}
              passHref
              key={tag.sys.id}
              prefetch={false}
            >
              <a className="group focus:outline-none">
                <span className="text-xs inline-block">🔗</span>
                <span className="group-hover:underline group-hover:text-emerald-500 group-active:text-emerald-600 group-focus-within:text-emerald-500 group-focus-visible:underline motion-safe:transition-colors ml-1">
                  {tag.name}
                </span>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
