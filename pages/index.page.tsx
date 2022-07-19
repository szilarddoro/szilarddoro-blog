import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import ArticleInfo from '../components/article-info'
import Heading, {defaultStyleMap} from '../components/heading'
import Layout from '../components/layout'
import Paragraph from '../components/paragraph'
import contentfulClient from '../lib/contentful-client'
import convertPost from '../lib/convert-post'
import getAuthorWithRelativeImage from '../lib/get-author-with-relative-image'
import type {AuthorModel, ConvertedAuthor} from '../types/author.types'
import type {
  ConfigurationModel,
  ConvertedConfiguration,
} from '../types/configuration.types'
import type {ConvertedPostCollection, PostModel} from '../types/post.types'

export type HomePageProps = {
  /**
   * Site configuration.
   */
  siteConfiguration?: ConvertedConfiguration
  /**
   * A collection of blog posts.
   */
  blogPosts?: ConvertedPostCollection
  /**
   * Primary author of the blog.
   */
  primaryAuthor?: ConvertedAuthor
}

export default function Home({
  siteConfiguration,
  blogPosts,
  primaryAuthor,
}: HomePageProps) {
  if (!siteConfiguration) {
    throw new Error(
      `Site configuration is not available. Make sure you set up Contentful and your environment variables correctly.`,
    )
  }

  return (
    <Layout
      siteName={siteConfiguration.fields.title}
      className="grid"
      seoProps={{
        description: siteConfiguration.fields.description,
        openGraph: {
          locale: siteConfiguration.sys.locale,
          url: siteConfiguration.fields.siteUrl,
          type: `website`,
          images: [
            {
              url: siteConfiguration.fields.openGraphImage,
            },
          ],
        },
      }}
    >
      {primaryAuthor && (
        <div className="grid items-center grid-flow-col gap-3 mt-2 mb-4 justify-self-start">
          <Image
            src={primaryAuthor.fields.image.relative_url}
            alt={
              primaryAuthor.fields.image.context?.custom.alt ||
              primaryAuthor.fields.name
            }
            width={52}
            height={52}
            className="rounded-full"
            layout="fixed"
            priority
            objectFit="cover"
            quality={100}
          />

          <div className="grid">
            <span className="text-xl font-bold font-heading">
              {primaryAuthor.fields.name}
            </span>
            <span className="text-base">{primaryAuthor.fields.title}</span>
          </div>
        </div>
      )}

      <div className="grid gap-6 mt-2">
        {(!blogPosts || !blogPosts.items) && (
          <span>Sajnos egyelőre még egy poszt sem került fel az oldalra.</span>
        )}

        {blogPosts &&
          blogPosts.items.map(post => (
            <section key={post.sys.id}>
              <Link href={`/${post.fields.slug}/`} passHref prefetch={false}>
                <a
                  className={clsx(
                    'group text-gray-900 dark:text-white',
                    'text-opacity-80 dark:text-opacity-80',
                    'hover:text-opacity-95 dark:hover:text-opacity-95',
                    'active:text-opacity-100 dark:active:text-opacity-100',
                    'focus-visible:text-opacity-100 dark:focus-visible:text-opacity-100 focus-visible:outline-none',
                    'motion-safe:transition-all motion-safe:duration-200',
                  )}
                >
                  <Heading
                    variant="h2"
                    styleMap={{
                      ...defaultStyleMap,
                      h2: `text-3xl font-semibold font-heading leading-snug my-2 group-focus-visible:underline dark:group-focus-visible:underline`,
                    }}
                  >
                    {post.fields.title}
                  </Heading>

                  <Paragraph
                    className={clsx(
                      'text-gray-900 dark:text-white',
                      'text-opacity-80 dark:text-opacity-80',
                      'group-hover:text-opacity-95 dark:group-hover:text-opacity-95',
                      'group-active:text-opacity-100 dark:group-active:text-opacity-100',
                      'group-focus-visible:text-opacity-100 dark:group-focus-visible:text-opacity-100',
                      'motion-safe:transition-all motion-safe:duration-200',
                    )}
                  >
                    {post.fields.description}
                  </Paragraph>
                </a>
              </Link>

              <ArticleInfo className="mt-2" post={post} hideAuthor />
            </section>
          ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const rawBlogPosts = await contentfulClient.getEntries<PostModel>({
    content_type: `blogPost`,
    order: `-sys.createdAt`,
  })

  const convertedBlogPosts = await Promise.all(
    rawBlogPosts.items.map(convertPost),
  )

  const blogPosts: ConvertedPostCollection = {
    ...rawBlogPosts,
    items: convertedBlogPosts,
  }

  const primaryAuthorId = process.env.PRIMARY_AUTHOR_ID
  let primaryAuthor: ConvertedAuthor | null = null

  if (primaryAuthorId) {
    const primaryAuthorData = await contentfulClient.getEntry<AuthorModel>(
      primaryAuthorId,
    )

    primaryAuthor = {
      ...(primaryAuthorData as unknown as ConvertedAuthor),
      fields: getAuthorWithRelativeImage(primaryAuthorData.fields),
    }
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
      primaryAuthor,
    },
  }
}
