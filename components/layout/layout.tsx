import clsx from 'clsx'
import {NextSeo} from 'next-seo'
import Link from 'next/link'
import {DetailedHTMLProps, HTMLProps} from 'react'
import Heading from '../heading'

export type LayoutProps = DetailedHTMLProps<
  HTMLProps<HTMLDivElement>,
  HTMLDivElement
> & {
  /**
   * Title of the page.
   */
  pageTitle?: string
}

export default function Layout({
  pageTitle,
  children,
  className,
  ...props
}: LayoutProps) {
  const hasTitle = Boolean(pageTitle)

  return (
    <div
      className={clsx(
        `container max-w-3xl mx-auto pb-24 px-4 md:px-6`,
        className,
      )}
      {...props}
    >
      <NextSeo
        defaultTitle="szilarddoro.com"
        title={pageTitle || 'szilarddoro.com'}
        titleTemplate={hasTitle ? '%s — szilarddoro.com' : 'szilarddoro.com'}
      />

      <header className="grid gap-6 py-6">
        <Link href="/" passHref>
          <a className="my-3 justify-self-start hover:text-blue-500 active:text-blue-600 motion-safe:transition-colors focus-visible:text-blue-500 focus-visible:outline-none">
            <Heading component="span" variant="h2">
              Személyes blogom
            </Heading>
          </a>
        </Link>
      </header>

      {children}
    </div>
  )
}
