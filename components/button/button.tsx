import clsx from 'clsx'
import {DetailedHTMLProps, HTMLProps} from 'react'

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
    <button className={clsx(className)} {...props}>
      {children}
    </button>
  )
}
