import clsx from 'clsx'
import Link from 'next/link'
import type {DetailedHTMLProps, HTMLProps} from 'react'
import type {PostModel} from '../../types/post.types'

export type ArticleInfoProps = DetailedHTMLProps<
  HTMLProps<HTMLDivElement>,
  HTMLDivElement
> & {
  post: PostModel
}

export default function ArticleInfo({
  className,
  children,
  post,
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

      <div>
        <span>{post.author.fields.name}</span>
        <span> · </span>
        <span>
          {new Intl.DateTimeFormat(`hu`).format(new Date(post.publishDate))}
        </span>
        <span> · </span>
        {post.tags.map(tag => (
          <Link href={`/kategoriak/${tag.sys.id}`} passHref key={tag.sys.id}>
            <a className="group">
              <span className="underline group-hover:text-blue-500 group-active:text-blue-500">
                {tag.name}
              </span>{' '}
              🔗
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}
