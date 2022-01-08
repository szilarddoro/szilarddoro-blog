import Link from 'next/link'
import Heading from '../components/heading'
import Layout from '../components/layout'
import Paragraph from '../components/paragraph'

export default function NotFound() {
  return (
    <Layout seoProps={{noindex: true, nofollow: true}} className="grid gap-2">
      <Heading variant="h2" component="h1">
        A keresett oldal nem található
      </Heading>
      <Paragraph>Biztosan ezt az oldalt kerested? </Paragraph>

      <Link href="/">
        <a className="text-emerald-500 hover:text-emerald-600 active:text-emerald-700 hover:underline focus-visible:underline focus-visible:outline-none ">
          Vissza a főoldalra
        </a>
      </Link>
    </Layout>
  )
}
