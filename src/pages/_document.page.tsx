import {Head, Html, Main, NextScript} from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />

      <body className="font-body text-base text-gray-900 dark:text-white dark:bg-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
