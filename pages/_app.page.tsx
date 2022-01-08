import '@fontsource/bitter'
import '@fontsource/bitter/600.css'
import '@fontsource/bitter/latin-ext-400.css'
import '@fontsource/bitter/latin-ext-600.css'
import '@fontsource/merriweather'
import '@fontsource/merriweather/700.css'
import type {AppProps} from 'next/app'
import {ErrorBoundary} from 'react-error-boundary'
import Button from '../components/button'
import Heading from '../components/heading'
import Paragraph from '../components/paragraph'
import '../styles/globals.css'

export default function App({Component, pageProps}: AppProps) {
  return (
    <ErrorBoundary
      fallbackRender={({error, resetErrorBoundary}) => (
        <div className="grid gap-2 justify-items-center container max-w-3xl mx-auto px-4 py-4">
          <Heading className="text-gray-900">Hiba történt</Heading>
          <Paragraph className="text-gray-900">{error.message}</Paragraph>

          <Button
            className="bg-red-500 hover:bg-red-600 active:bg-red-700 motion-safe:transition-colors text-white py-2 px-4 rounded-md font-semibold"
            onClick={resetErrorBoundary}
          >
            Oldal frissítése
          </Button>
        </div>
      )}
    >
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}
