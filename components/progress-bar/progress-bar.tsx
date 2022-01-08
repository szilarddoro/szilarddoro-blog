import NextNProgress from 'nextjs-progressbar'

export interface ProgressBarProps {
  color: string
  height: number
  startPosition: number
  options?: Partial<{showSpinner: boolean}>
}

export function ProgressBar({
  color,
  height,
  startPosition,
  options,
}: ProgressBarProps) {
  return (
    <NextNProgress
      color={color}
      height={height}
      startPosition={startPosition}
      options={options}
      stopDelayMs={200}
    />
  )
}

export default ProgressBar
