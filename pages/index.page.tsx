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
        <div className="grid grid-flow-col justify-self-start items-center gap-3 mt-2 mb-4">
          <Image
            src={primaryAuthor.fields.image.relative_url}
            alt={primaryAuthor.fields.image.context.custom.alt}
            width={52}
            height={52}
            className="rounded-full"
            layout="fixed"
            priority
            objectFit="cover"
            quality={100}
          />

          <div className="grid">
            <span className="font-bold font-heading text-xl">
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
                <a className="text-gray-900 dark:text-white hover:text-emerald-500 active:text-emerald-600 focus-visible:text-emerald-500 focus-visible:outline-none motion-safe:transition-colors">
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
                </a>
              </Link>

              <ArticleInfo className="mt-2" post={post.fields} />
            </section>
          ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const rawBlogPosts = await contentfulClient.getEntries<PostModel>({
    content_type: `blogPost`,
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
