import {DetailedHTMLProps, HTMLProps} from 'react'
import {twMerge} from 'tailwind-merge'

export type ButtonProps = DetailedHTMLProps<
  HTMLProps<HTMLButtonElement>,
  HTMLButtonElement
> & {
  type?: 'button' | 'reset' | 'submit'
}

export default function Button({
  type = 'button',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={twMerge(className)} {...props}>
      {children}
    </button>
  )
}
