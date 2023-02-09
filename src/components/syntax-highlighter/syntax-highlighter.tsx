import {
  PrismAsyncLight as ReactSyntaxHighlighter,
  SyntaxHighlighterProps as ReactSyntaxHighlighterProps,
} from 'react-syntax-highlighter'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import {tomorrow} from 'react-syntax-highlighter/dist/cjs/styles/prism'

export type SyntaxHighlighterProps = ReactSyntaxHighlighterProps

ReactSyntaxHighlighter.registerLanguage(`jsx`, jsx)
ReactSyntaxHighlighter.registerLanguage(`javascript`, javascript)
ReactSyntaxHighlighter.registerLanguage(`tsx`, tsx)
ReactSyntaxHighlighter.registerLanguage(`typescript`, typescript)

export default function SyntaxHighlighter({
  children,
  ...props
}: SyntaxHighlighterProps) {
  return (
    <ReactSyntaxHighlighter style={tomorrow} {...props}>
      {children}
    </ReactSyntaxHighlighter>
  )
}
