import clsx from 'clsx'
import {NextSeo, NextSeoProps} from 'next-seo'
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
  /**
   * Class name applied to the wrapper element.
   */
  wrapperClassName?: string
  /**
   * Props passed to the SEO component.
   */
  seoProps?: NextSeoProps
}

export default function Layout({
  pageTitle,
  children,
  className,
  wrapperClassName,
  seoProps,
  ...props
}: LayoutProps) {
  const hasTitle = Boolean(pageTitle)

  return (
    <div className={clsx(`pb-24`, wrapperClassName)} {...props}>
      <NextSeo
        defaultTitle="szilarddoro.com"
        title={pageTitle || 'szilarddoro.com'}
        titleTemplate={hasTitle ? '%s — szilarddoro.com' : 'szilarddoro.com'}
        {...seoProps}
      />

      <header className="py-2">
        <div className="grid gap-6 container max-w-3xl mx-auto px-4 md:px-6">
          <Link href="/" passHref>
            <a className="my-3 justify-self-start hover:text-green-500 active:text-green-600 motion-safe:transition-colors focus-visible:text-green-500 focus-visible:outline-none">
              <Heading component="span" variant="h2">
                Szilard&apos;s Scrapyard
              </Heading>
            </a>
          </Link>
        </div>
      </header>

      <article
        className={clsx('container max-w-3xl mx-auto px-4 md:px-6', className)}
      >
        {children}
      </article>
    </div>
  )
}
