import {createElement, DetailedHTMLProps, HTMLProps} from 'react'
import {twMerge} from 'tailwind-merge'

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
   * Component to be used to render the heading. By default `variant` is used to
   * render the component, so specifying this prop overrides the default
   * behaviour.
   */
  component?: React.ElementType
  /**
   * A map of styles for different variants.
   */
  styleMap?: HeadingStyleMap
}

export const defaultStyleMap: HeadingStyleMap = {
  h1: `text-4xl font-heading font-bold`,
  h2: `text-3xl font-heading font-semibold`,
  h3: `text-2xl font-heading font-semibold`,
  h4: `text-xl font-heading font-semibold`,
  h5: `text-lg font-heading font-semibold`,
  h6: `text-base font-heading font-semibold`,
}

export default function Heading({
  component,
  variant = 'h1',
  children,
  className,
  styleMap = defaultStyleMap,
  ...props
}: HeadingProps) {
  return createElement(
    component || variant,
    {className: twMerge(styleMap[variant], className), ...props},
    children,
  )
}
