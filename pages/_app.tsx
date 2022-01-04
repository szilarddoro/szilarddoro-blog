import '@fontsource/cambo'
import '@fontsource/merriweather'
import '@fontsource/merriweather/700.css'
import type {AppProps} from 'next/app'
import {ErrorBoundary} from 'react-error-boundary'
import Heading from '../components/heading'
import Paragraph from '../components/paragraph'
import '../styles/globals.css'

export default function App({Component, pageProps}: AppProps) {
  return (
    <ErrorBoundary
      fallbackRender={({error, resetErrorBoundary}) => {
        return (
          <div>
            <Heading className="text-red-500">An error occurred</Heading>
            <Paragraph className="text-red-500">{error.message}</Paragraph>

            <button onClick={resetErrorBoundary}>Try Again</button>
          </div>
        )
      }}
    >
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}
