import clsx from 'clsx'
import Image from 'next/image'
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
  /**
   * Determines whether the author's avatar is being displayed or not.
   */
  hideAuthorAvatar?: boolean
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
        'grid grid-flow-col place-content-start items-center',
        'text-base text-gray-700 dark:text-white dark:text-opacity-70',
        className,
      )}
      {...props}
    >
      {children}

      <div className="grid items-center grid-flow-row text-sm md:grid-flow-col gap-y-1 md:gap-y-0 place-content-start place-items-start gap-x-1 sm:text-base">
        {!hideAuthor && (
          <div className="inline-grid items-center grid-flow-col gap-2">
            <Image
              src={post.fields.author.fields.image.relative_url}
              alt={
                post.fields.author.fields.image.context?.custom.alt ||
                post.fields.author.fields.name
              }
              width={32}
              height={32}
              className="rounded-full"
              layout="fixed"
              priority
            />

            <span>{post.fields.author.fields.name}</span>
          </div>
        )}

        {!hideAuthor && <span className="hidden md:inline"> · </span>}

        <div className="grid items-center grid-flow-col gap-1">
          <span>
            {new Intl.DateTimeFormat(post.sys.locale).format(
              new Date(post.sys.createdAt),
            )}
          </span>

          <span> · </span>

          <div className="flex flex-wrap items-center">
            {post.fields.readingTime < 5 && <span className="mr-0.5">☕</span>}
            {post.fields.readingTime >= 5 && post.fields.readingTime < 10 && (
              <span className="mr-0.5">☕☕</span>
            )}
            {post.fields.readingTime >= 10 && (
              <span className="mr-0.5">☕☕☕</span>
            )}
            <span>{post.fields.readingTime} perc</span>
          </div>

          <span> · </span>

          <div>
            {post.fields.tags.map(tag => (
              <Link
                href={`/categories/${tag.sys.id}`}
                passHref
                key={tag.sys.id}
                prefetch={false}
              >
                <a className="flex flex-wrap items-center group focus:outline-none">
                  <span className="text-xs inline-block mr-0.5">🔗</span>
                  <span className="group-hover:underline group-hover:text-emerald-500 group-active:text-emerald-600 group-focus-within:text-emerald-500 group-focus-visible:underline motion-safe:transition-colors ml-0.5">
                    {tag.name}
                  </span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
