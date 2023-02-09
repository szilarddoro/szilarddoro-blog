import ArticleInfo from '@/components/article-info'
import Heading, {defaultStyleMap} from '@/components/heading'
import Layout from '@/components/layout'
import Paragraph from '@/components/paragraph'
import contentfulClient from '@/lib/contentful-client'
import convertPost from '@/lib/convert-post'
import {
  ConfigurationModel,
  ConvertedConfiguration,
} from '@/types/configuration.types'
import type {ConvertedPostCollection, PostModel} from '@/types/post.types'
import type {Tag} from 'contentful'
import type {GetStaticPropsContext} from 'next'
import Link from 'next/link'

export type CategoryListPageProps = {
  /**
   * Tag used to open the page.
   */
  tag: Tag
  /**
   * Site configuration.
   */
  siteConfiguration?: ConvertedConfiguration
  /**
   * A collection of blog posts.
   */
  blogPosts?: ConvertedPostCollection
  /**
   * Error message.
   */
  error?: string
}

export default function CategoryList({
  siteConfiguration,
  blogPosts,
  tag,
  error,
}: CategoryListPageProps) {
  if (error) {
    throw new Error(error)
  }

  if (!siteConfiguration) {
    throw new Error(
      `Site configuration is not available. Make sure you set up Contentful and your environment variables correctly.`,
    )
  }

  if (!blogPosts || !blogPosts.items) {
    throw new Error(`Blog posts could not be loaded.`)
  }

  return (
    <Layout
      siteName={siteConfiguration.fields.title}
      pageTitle={`Kategóriák / ${tag.name}`}
      seoProps={{
        description: siteConfiguration.fields.description,
        openGraph: {
          locale: siteConfiguration.sys.locale,
          url: `${siteConfiguration.fields.siteUrl}/categories/${tag.sys.id}`,
          type: `website`,
          images: [
            {
              url: siteConfiguration.fields.openGraphImage,
            },
          ],
        },
      }}
    >
      <Heading variant="h4" component="h1" className="mb-4">
        🗂️{' '}
        <span className="inline-block ml-0.5 text-slate-700 dark:text-white dark:text-opacity-50">
          Kategóriák / {tag.name}
        </span>
      </Heading>

      <div className="grid gap-6 mt-4">
        {blogPosts.items.map(post => (
          <section key={post.sys.id}>
            <Link
              href={`/${post.fields.slug}/`}
              prefetch={false}
              className="text-gray-900 dark:text-white hover:text-emerald-500 active:text-emerald-600 motion-safe:transition-colors focus-visible:text-emerald-500 focus-visible:outline-none"
            >
              <Heading
                variant="h2"
                styleMap={{
                  ...defaultStyleMap,
                  h2: `text-3xl font-semibold font-heading leading-snug my-2`,
                }}
              >
                {post.fields.title}
              </Heading>

              <Paragraph className="text-gray-900 dark:text-white">
                {post.fields.description}
              </Paragraph>
            </Link>

            <ArticleInfo className="mt-2" post={post} hideAuthor />
          </section>
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const tags = await contentfulClient.getTags()

  return {
    paths: tags.items.map(tag => ({
      params: {id: tag.sys.id},
    })),
    fallback: false,
  }
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{id: string}>) {
  if (!params) {
    return {
      props: {},
    }
  }

  try {
    const {id} = params
    const tag = await contentfulClient.getTag(id)
    const rawBlogPosts = await contentfulClient.getEntries<PostModel>({
      content_type: `blogPost`,
      order: `-sys.createdAt`,
      [`metadata.tags.sys.id[in]`]: id,
    })

    const convertedBlogPosts = await Promise.all(
      rawBlogPosts.items.map(convertPost),
    )

    const blogPosts: ConvertedPostCollection = {
      ...rawBlogPosts,
      items: convertedBlogPosts,
    }

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
        blogPosts,
        tag,
      },
    }
  } catch (error) {
    return {
      props: {
        error: (error as Error).message,
      },
    }
  }
}
