import clsx from 'clsx'
import Link from 'next/link'
import {DetailedHTMLProps, HTMLProps} from 'react'
import Heading from '../heading'

export type LayoutProps = DetailedHTMLProps<
  HTMLProps<HTMLDivElement>,
  HTMLDivElement
>

export default function Layout({children, className, ...props}: LayoutProps) {
  return (
    <div
      className={clsx(`container max-w-3xl mx-auto py-4`, className)}
      {...props}
    >
      <header className="py-4">
        <Link href="/" passHref>
          <a className="text-gray-900 hover:text-blue-500 active:text-blue-600 motion-safe:transition-colors focus-visible:text-blue-500 focus-visible:outline-none">
            <Heading>Szilard Doro</Heading>
          </a>
        </Link>
      </header>

      {children}
    </div>
  )
}
