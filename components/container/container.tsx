import clsx from 'clsx'
import {createElement, DetailedHTMLProps, HTMLProps} from 'react'

export type ContainerProps = DetailedHTMLProps<
  HTMLProps<HTMLDivElement>,
  HTMLDivElement
> & {
  /**
   * A component to be used to wrap the children.
   */
  component?: string
}

export default function Container({
  className,
  children,
  component = `div`,
  ...props
}: ContainerProps) {
  return createElement(
    component,
    {
      className: clsx(`container max-w-4xl mx-auto px-4 md:px-6`, className),
      ...props,
    },
    children,
  )
}
