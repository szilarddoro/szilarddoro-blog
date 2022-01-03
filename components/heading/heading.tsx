import clsx from 'clsx'
import {createElement, DetailedHTMLProps, HTMLProps} from 'react'

export type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type HeadingStyleMap = Record<HeadingVariant, string>

export type HeadingProps = DetailedHTMLProps<
  HTMLProps<HTMLHeadingElement>,
  HTMLHeadingElement
> & {
  /**
   * Variant of the native heading element.
   *
   * @default 'h1'
   */
  variant?: HeadingVariant
  /**
   * A map of styles for different variants.
   */
  styleMap?: HeadingStyleMap
}

export const defaultStyleMap: HeadingStyleMap = {
  h1: `text-4xl font-heading font-bold`,
  h2: `text-3xl mt-4 mb-2 font-heading font-semibold`,
  h3: `text-2xl my-2 font-heading font-semibold`,
  h4: `text-xl my-2 font-heading font-semibold`,
  h5: `text-lg my-2 font-heading font-semibold`,
  h6: `text-base my-2 font-heading font-semibold`,
}

export default function Heading({
  variant = 'h1',
  children,
  className,
  styleMap = defaultStyleMap,
  ...props
}: HeadingProps) {
  return createElement(
    variant,
    {className: clsx(styleMap[variant], className), ...props},
    children,
  )
}
