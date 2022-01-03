import '@fontsource/open-sans'
import '@fontsource/open-sans/700.css'
import '@fontsource/roboto-mono'
import type {AppProps} from 'next/app'
import {ErrorBoundary} from 'react-error-boundary'
import '../styles/globals.css'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ErrorBoundary
      fallbackRender={({error, resetErrorBoundary}) => {
        return (
          <div>
            <h1>An error occurred</h1>
            <p>{error.message}</p>

            <button onClick={resetErrorBoundary}>Try Again</button>
          </div>
        )
      }}
    >
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}

export default MyApp
