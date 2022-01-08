import clsx from 'clsx'
import Link from 'next/link'
import type {DetailedHTMLProps, HTMLProps} from 'react'
import {CloudinaryImageModel} from '../../types/image.types'
import type {PostModel} from '../../types/post.types'

export type ArticleInfoProps<TBody> = DetailedHTMLProps<
  HTMLProps<HTMLDivElement>,
  HTMLDivElement
> & {
  post: PostModel<CloudinaryImageModel, TBody>
}

export default function ArticleInfo<TBody>({
  className,
  children,
  post,
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
        <span>{post.author.fields.name}</span>
        <span> · </span>
        <span>
          {new Intl.DateTimeFormat(`hu`).format(new Date(post.publishDate))}
        </span>
        <span> · </span>
        {post.tags.map(tag => (
          <Link href={`/kategoriak/${tag.sys.id}`} passHref key={tag.sys.id}>
            <a className="group focus:outline-none">
              <span className="underline group-hover:text-emerald-500 group-active:text-emerald-600 group-focus-within:text-emerald-500 motion-safe:transition-colors">
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
