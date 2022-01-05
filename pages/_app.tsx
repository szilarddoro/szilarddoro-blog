import '@fontsource/bitter'
import '@fontsource/bitter/latin-ext-400.css'
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
            <Heading className="text-red-500">Hiba történt</Heading>
            <Paragraph className="text-red-500">{error.message}</Paragraph>

            <button onClick={resetErrorBoundary}>Oldal frissítése</button>
          </div>
        )
      }}
    >
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}
