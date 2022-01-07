import {Entry} from 'contentful'
import type {GetStaticPropsContext} from 'next'
import {MDXRemote, MDXRemoteSerializeResult} from 'next-mdx-remote'
import {serialize} from 'next-mdx-remote/serialize'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import type {PropsWithChildren} from 'react'
import ArticleInfo from '../components/article-info'
import Heading from '../components/heading'
import Layout from '../components/layout'
import Paragraph from '../components/paragraph'
import contentfulClient from '../lib/contentful-client'
import type {PostModel} from '../types/post.types'

const SyntaxHighlighter = dynamic(
  () => import(`../components/syntax-highlighter`),
)

type PostWithSerializedBody = Entry<
  PostModel & {
    serializedBody: MDXRemoteSerializeResult
  }
>

export type PostPageProps = {
  post?: PostWithSerializedBody
  error?: string
}

export default function Post({post, error}: PostPageProps) {
  if (error) {
    throw new Error(error)
  }

  if (!post) {
    throw new Error(`Please make sure that blog post is available.`)
  }

  return (
    <Layout
      pageTitle={post.fields.title}
      seoProps={{
        description: post.fields.description,
        openGraph: {
          images: [{url: `https:${post.fields.heroImage.fields.file.url}`}],
        },
      }}
    >
      <ArticleInfo
        className="grid grid-flow-col place-content-start items-center gap-2 mb-4"
        post={post.fields}
      >
        <Image
          src={`https:${post.fields.author.fields.image.fields.file.url}`}
          alt={post.fields.author.fields.image.fields.title}
          width={32}
          height={32}
          className="rounded-full"
          layout="fixed"
          priority
        />
      </ArticleInfo>

      <div className="mb-6 -mx-4 md:mx-0 md:rounded-md overflow-hidden">
        <Image
          src={`https:${post.fields.heroImage.fields.file.url}`}
          alt={post.fields.heroImage.fields.title}
          width={700}
          height={366}
          objectFit="cover"
          layout="responsive"
          sizes="(max-width: 576px) 576px, (max-width: 640px) 828px, 828px"
          priority
        />
      </div>

      <Heading className="leading-snug">{post.fields.title}</Heading>

      <MDXRemote
        {...post.fields.serializedBody}
        components={{
          h2: (props: any) => Heading({variant: `h2`, ...props}),
          h3: (props: any) => Heading({variant: `h3`, ...props}),
          h4: (props: any) => Heading({variant: `h4`, ...props}),
          ul: ({children}: PropsWithChildren<unknown>) => (
            <ul className="list-disc list-inside">{children}</ul>
          ),
          li: ({children}: PropsWithChildren<unknown>) => (
            <li className="pl-2">{children}</li>
          ),
          p: ({children}: PropsWithChildren<unknown>) => (
            <Paragraph className="my-4">{children}</Paragraph>
          ),
          a: ({children, ...props}: PropsWithChildren<{href: string}>) => (
            <Link passHref {...props}>
              <a
                target={props.href.startsWith(`/`) ? '_self' : '_blank'}
                rel={props.href.startsWith(`/`) ? '' : 'noopener noreferrer'}
                className="text-blue-500 hover:underline border-b-"
              >
                {children}
              </a>
            </Link>
          ),
          pre: ({children}: PropsWithChildren<any>) => {
            return (
              <SyntaxHighlighter
                showLineNumbers
                language={children.props.className.replace(/language\-/i, '')}
              >
                {children.props.children}
              </SyntaxHighlighter>
            )
          },
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
    const {slug} = params
    const data = await contentfulClient.getEntries<PostModel>({
      content_type: `blogPost`,
      'fields.slug': slug,
    })
    const [post] = data.items

    if (!post) {
      return {
        props: {
          error: `Post not found.`,
        },
      }
    }

    const serializedBody = await serialize(post.fields.body)
    const tags = await Promise.all(
      post.metadata.tags.map(tag => contentfulClient.getTag(tag.sys.id)),
    )

    return {
      props: {
        post: {
          ...post,
          fields: {
            ...post.fields,
            tags,
            serializedBody,
          },
        },
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
