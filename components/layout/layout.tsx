import clsx from 'clsx'
import {NextSeo, NextSeoProps} from 'next-seo'
import Link from 'next/link'
import {DetailedHTMLProps, HTMLProps} from 'react'
import Container from '../container'
import Heading from '../heading'

export type LayoutProps = DetailedHTMLProps<
  HTMLProps<HTMLDivElement>,
  HTMLDivElement
> & {
  /**
   * Name of the site.
   */
  siteName: string
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
  siteName,
  children,
  className,
  wrapperClassName,
  seoProps,
  ...props
}: LayoutProps) {
  const hasTitle = Boolean(pageTitle)

  return (
    <div
      className={clsx(`grid content-between min-h-screen`, wrapperClassName)}
      {...props}
    >
      <NextSeo
        defaultTitle={siteName}
        title={pageTitle || siteName}
        titleTemplate={hasTitle ? `%s — ${siteName}` : `${siteName}`}
        {...seoProps}
      />

      <div>
        <header className="py-2 md:py-4">
          <Container className="grid gap-6">
            <Link href="/" passHref>
              <a className="my-3 justify-self-start hover:text-emerald-500 active:text-emerald-600 motion-safe:transition-colors focus-visible:text-emerald-500 focus-visible:outline-none">
                <Heading component="span" variant="h2">
                  {siteName}
                </Heading>
              </a>
            </Link>
          </Container>
        </header>

        <Container className={clsx('pb-24', className)}>{children}</Container>
      </div>

      <footer className="py-4">
        <Container className="grid grid-flow-col items-center justify-between text-base">
          <div className="grid grid-flow-col gap-2">
            <Link href="https://github.com/szilarddoro" passHref>
              <a
                rel="noopener noreferrer"
                target="_blank"
                className="focus-visible:outline-none group"
              >
                💻{' '}
                <span className="underline hover:text-emerald-500 active:text-emerald-600 group-focus-visible:text-emerald-500 transition-colors">
                  GitHub
                </span>
              </a>
            </Link>

            <Link href="https://twitter.com/szilarddoro" passHref>
              <a
                rel="noopener noreferrer"
                target="_blank"
                className="focus-visible:outline-none group"
              >
                🐦{' '}
                <span className="underline hover:text-emerald-500 active:text-emerald-600 group-focus-visible:text-emerald-500 transition-colors">
                  Twitter
                </span>
              </a>
            </Link>
          </div>

          <Link href="mailto:hello@szilarddoro.com" passHref>
            <a className="focus-visible:outline-none group">
              📮{' '}
              <span className="underline hover:text-emerald-500 active:text-emerald-600 group-focus-visible:text-emerald-500 transition-colors">
                Email
              </span>
            </a>
          </Link>
        </Container>
      </footer>
    </div>
  )
}
