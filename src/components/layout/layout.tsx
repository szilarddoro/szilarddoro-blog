import Container from '@/components/container'
import Heading from '@/components/heading'
import {Bitter} from '@next/font/google'
import {NextSeo, NextSeoProps} from 'next-seo'
import Link from 'next/link'
import {DetailedHTMLProps, HTMLProps} from 'react'
import {twMerge} from 'tailwind-merge'

const bitter = Bitter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-bitter',
})

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
      className={twMerge(
        `relative min-h-screen pb-12`,
        bitter.className,
        wrapperClassName,
      )}
      {...props}
    >
      <NextSeo
        defaultTitle={siteName}
        title={pageTitle || siteName}
        titleTemplate={hasTitle ? `%s — ${siteName}` : `${siteName}`}
        {...seoProps}
      />

      <header className="py-2 md:py-4">
        <Container className="grid gap-6">
          <Link
            href="/"
            className="my-3 justify-self-start hover:text-emerald-500 active:text-emerald-600 motion-safe:transition-colors focus-visible:text-emerald-500 focus-visible:outline-none"
          >
            <Heading component="span" variant="h2">
              {siteName}
            </Heading>
          </Link>
        </Container>
      </header>

      <Container component="main" className={twMerge(`pb-12`, className)}>
        {children}
      </Container>

      <footer className="py-6 absolute bottom-0 w-full">
        <Container className="grid grid-flow-col items-center justify-between text-base">
          <div className="grid grid-flow-col gap-2">
            <Link
              href="https://github.com/szilarddoro"
              rel="noopener noreferrer"
              target="_blank"
              className="focus-visible:outline-none group"
            >
              💻{' '}
              <span className="underline hover:text-emerald-500 active:text-emerald-600 group-focus-visible:text-emerald-500 transition-colors">
                GitHub
              </span>
            </Link>

            <Link
              href="https://twitter.com/szilarddoro"
              rel="noopener noreferrer"
              target="_blank"
              className="focus-visible:outline-none group"
            >
              🐦{' '}
              <span className="underline hover:text-emerald-500 active:text-emerald-600 group-focus-visible:text-emerald-500 transition-colors">
                Twitter
              </span>
            </Link>
          </div>

          <Link
            href="mailto:blog@szilarddoro.com"
            passHref
            className="focus-visible:outline-none group"
          >
            📮{' '}
            <span className="underline hover:text-emerald-500 active:text-emerald-600 group-focus-visible:text-emerald-500 transition-colors">
              Email
            </span>
          </Link>
        </Container>
      </footer>
    </div>
  )
}
