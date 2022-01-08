import Link from 'next/link'
import Heading from '../components/heading'
import Layout from '../components/layout'
import Paragraph from '../components/paragraph'
import contentfulClient from '../lib/contentful-client'
import type {
  ConfigurationModel,
  ConvertedConfiguration,
} from '../types/configuration.types'

export type NotFoundPageProps = {
  /**
   * Site configuration.
   */
  siteConfiguration: ConvertedConfiguration
}

export default function NotFound({siteConfiguration}: NotFoundPageProps) {
  if (!siteConfiguration) {
    throw new Error(
      `Site configuration is not available. Make sure you set up Contentful and your environment variables correctly.`,
    )
  }

  return (
    <Layout
      siteName={siteConfiguration.fields.title}
      seoProps={{noindex: true, nofollow: true}}
      className="grid gap-2"
    >
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

export async function getStaticProps() {
  const siteConfigurationId = process.env.SITE_CONFIGURATION_ID

  let siteConfiguration: ConvertedConfiguration | null = null

  if (siteConfigurationId) {
    siteConfiguration = await contentfulClient.getEntry<ConfigurationModel>(
      siteConfigurationId,
    )
  }

  return {
    props: {
      siteConfiguration,
    },
  }
}
