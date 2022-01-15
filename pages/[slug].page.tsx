import type {GetStaticPropsContext} from 'next'
import {MDXRemote} from 'next-mdx-remote'
import Link from 'next/link'
import type {PropsWithChildren} from 'react'
import ArticleInfo from '../components/article-info'
import Heading from '../components/heading'
import ImageWithCaption from '../components/image-with-caption'
import Layout from '../components/layout'
import Paragraph from '../components/paragraph'
import SyntaxHighlighter from '../components/syntax-highlighter'
import contentfulClient from '../lib/contentful-client'
import convertPost from '../lib/convert-post'
import convertTextToIdentifier from '../lib/convert-text-to-identifier'
import type {
  ConfigurationModel,
  ConvertedConfiguration,
} from '../types/configuration.types'
import type {ConvertedPost, PostModel} from '../types/post.types'

export type PostPageProps = {
  /**
   * Site configuration.
   */
  siteConfiguration?: ConvertedConfiguration
  /**
   * A post from Contentful.
   */
  post?: ConvertedPost
  /**
   * Error message.
   */
  error?: string
}

export default function Post({siteConfiguration, post, error}: PostPageProps) {
  if (error) {
    throw new Error(error)
  }

  if (!siteConfiguration) {
    throw new Error(
      `Site configuration is not available. Make sure you set up Contentful and your environment variables correctly.`,
    )
  }

  if (!post) {
    throw new Error(`Please make sure that blog post is available.`)
  }

  return (
    <Layout
      siteName={siteConfiguration.fields.title}
      pageTitle={post.fields.title}
      seoProps={{
        description: post.fields.description,
        openGraph: {
          locale: post.sys.locale,
          type: `article`,
          article: {
            publishedTime: post.sys.createdAt,
            modifiedTime: post.sys.updatedAt,
            authors: [post.fields.author.fields.name],
            tags: post.fields.tags.map(tag => tag.name),
          },
          url: `${siteConfiguration.fields.siteUrl.replace(/\/$/i, '')}/${
            post.fields.slug
          }`,
          images: [
            {
              url:
                post.fields.heroImage?.secure_url ||
                siteConfiguration.fields.openGraphImage,
            },
          ],
        },
      }}
    >
      <ArticleInfo className="mb-4" post={post} />

      {post.fields.heroImage && post.fields.heroImage.relative_url && (
        <ImageWithCaption
          wrapperClassName="mb-6"
          imageWrapperClassName="-mx-4 md:mx-0 md:rounded-md overflow-hidden"
          src={post.fields.heroImage.relative_url}
          alt={post.fields.heroImage.context.custom.alt}
          caption={post.fields.heroImage.context.custom.caption}
          width={post.fields.heroImage.width}
          height={post.fields.heroImage.height}
          objectFit="cover"
          layout="responsive"
          sizes="(max-width: 576px) 576px, (max-width: 640px) 828px, 828px"
          priority
        />
      )}

      <Heading className="leading-snug">{post.fields.title}</Heading>

      <MDXRemote
        {...post.fields.body}
        components={{
          // todo: convert content to ID and make H2 linkable
          h2: (props: PropsWithChildren<unknown>) => (
            <Link
              href={`#${convertTextToIdentifier(
                props.children?.toString() || ``,
              )}`}
            >
              <a className="group">
                {Heading({
                  variant: `h2`,
                  id: convertTextToIdentifier(props.children?.toString() || ``),
                  className: `my-6`,
                  ...props,
                  children: (
                    <>
                      <span className="group-hover:underline">
                        {props.children}
                      </span>{' '}
                      <span className="text-base group-hover:inline hidden">
                        🔗
                      </span>
                    </>
                  ),
                })}
              </a>
            </Link>
          ),
          h3: (props: PropsWithChildren<unknown>) =>
            Heading({variant: `h3`, className: `my-2`, ...props}),
          h4: (props: PropsWithChildren<unknown>) =>
            Heading({variant: `h4`, ...props}),
          ul: ({children}: PropsWithChildren<unknown>) => (
            <ul className="list-disc list-inside my-2">{children}</ul>
          ),
          ol: ({children}: PropsWithChildren<unknown>) => (
            <ol className="list-decimal list-inside my-2">{children}</ol>
          ),
          li: ({children}: PropsWithChildren<unknown>) => (
            <li className="pl-2 my-2 leading-relaxed">{children}</li>
          ),
          p: ({children}: PropsWithChildren<unknown>) => (
            <Paragraph className="my-4">{children}</Paragraph>
          ),
          a: ({children, ...props}: PropsWithChildren<{href: string}>) => (
            <Link passHref {...props} prefetch={false}>
              <a
                target={props.href.startsWith(`/`) ? '_self' : '_blank'}
                rel={props.href.startsWith(`/`) ? '' : 'noopener noreferrer'}
                className="text-emerald-500 hover:underline"
              >
                {children}
              </a>
            </Link>
          ),
          pre: ({children}: PropsWithChildren<any>) => (
            <SyntaxHighlighter
              showLineNumbers
              language={children.props.className.replace(/language\-/i, '')}
            >
              {children.props.children}
            </SyntaxHighlighter>
          ),
          img: ({src, alt, width, height, caption}: any) => (
            <ImageWithCaption
              imageWrapperClassName="-mx-4 md:mx-0 md:rounded-md overflow-hidden"
              src={src.replace(
                /https:\/\/res\.cloudinary\.com\/dtfzsgeku\/image\/upload\/v\d+/i,
                ``,
              )}
              alt={alt}
              width={width || 1000}
              height={height || 200}
              layout="responsive"
              objectFit="cover"
              sizes="(max-width: 576px) 576px, (max-width: 640px) 828px, 828px"
              caption={caption}
            />
          ),
        }}
      />
    </Layout>
  )
}

export async function getStaticPaths() {
  const post = await contentfulClient.getEntries<PostModel>({
    content_type: `blogPost`,
  })

  return {
    paths: post.items.map(post => ({
      params: {slug: post.fields.slug},
    })),
    fallback: false,
  }
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{slug: string}>) {
  if (!params) {
    return {
      props: {},
    }
  }

  try {
    const {
      items: [rawPost],
    } = await contentfulClient.getEntries<PostModel>({
      content_type: `blogPost`,
      'fields.slug': params.slug,
    })

    const post = await convertPost(rawPost)

    const siteConfigurationId = process.env.SITE_CONFIGURATION_ID

    let siteConfiguration: ConvertedConfiguration | null = null

    if (siteConfigurationId) {
      siteConfiguration = await contentfulClient.getEntry<ConfigurationModel>(
        siteConfigurationId,
      )
    }

    return {
      props: {
        post,
        siteConfiguration,
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
