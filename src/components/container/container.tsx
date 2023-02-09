import {createElement, DetailedHTMLProps, HTMLProps} from 'react'
import {twMerge} from 'tailwind-merge'

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
      className: twMerge(`container max-w-2xl mx-auto px-4 md:px-6`, className),
      ...props,
    },
    children,
  )
}
