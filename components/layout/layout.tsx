import clsx from 'clsx'
import {NextSeo} from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
import {DetailedHTMLProps, HTMLProps} from 'react'
import profilePicture from '../../public/szilard-doro-profile-picture.jpg'
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

      <header className="grid py-6">
        <Link href="/" passHref>
          <a className="grid grid-flow-col justify-self-start items-center gap-3 text-gray-900 hover:text-blue-500 active:text-blue-600 motion-safe:transition-colors focus-visible:text-blue-500 focus-visible:outline-none">
            <Image
              src={profilePicture}
              alt="Szilard Doro"
              width={56}
              height={56}
              className="rounded-full"
              layout="fixed"
              placeholder="blur"
            />

            <Heading component="span" variant="h3">
              Szilard Doro
            </Heading>
          </a>
        </Link>
      </header>

      {children}
    </div>
  )
}
