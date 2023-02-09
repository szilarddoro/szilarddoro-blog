import Button from '@/components/button'
import Heading from '@/components/heading'
import Paragraph from '@/components/paragraph'
import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import {ErrorBoundary} from 'react-error-boundary'

const ProgressBar = dynamic(() => import('@/components/progress-bar'), {
  ssr: false,
})

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0f172a" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="theme-color" content="#0f172a" />
        <meta
          name="application-name"
          content={process.env.NEXT_PUBLIC_APP_NAME}
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content={process.env.NEXT_PUBLIC_APP_NAME}
        />
      </Head>

      <ErrorBoundary
        fallbackRender={({error, resetErrorBoundary}) => (
          <div className="grid gap-2 justify-items-center container max-w-3xl mx-auto px-4 py-4">
            <Heading className="text-gray-900 dark:text-white">Error</Heading>
            <Paragraph className="text-gray-900 dark:text-white">
              {error.message}
            </Paragraph>

            <Button
              className="bg-red-500 hover:bg-red-600 active:bg-red-700 motion-safe:transition-colors text-white py-2 px-4 rounded-md font-semibold"
              onClick={resetErrorBoundary}
            >
              Refresh page
            </Button>
          </div>
        )}
      >
        <ProgressBar
          color="#10b981"
          height={3}
          startPosition={0.3}
          options={{showSpinner: false}}
        />
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  )
}
