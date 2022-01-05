import {GetStaticPropsContext} from 'next'
import {MDXRemote, MDXRemoteSerializeResult} from 'next-mdx-remote'
import {serialize} from 'next-mdx-remote/serialize'
import Image from 'next/image'
import Link from 'next/link'
import {PropsWithChildren} from 'react'
import ArticleInfo from '../components/article-info'
import Heading from '../components/heading'
import Layout from '../components/layout'
import Paragraph from '../components/paragraph'
import contentfulClient from '../lib/contentful-client'
import type {Post} from '../types/post.types'

type PostWithSerializedBody = Post & {
  body: MDXRemoteSerializeResult
}

export type PostPageProps = {
  data?: PostWithSerializedBody
  error?: string
}

export default function Post({data, error}: PostPageProps) {
  if (error) {
    throw error
  }

  if (!data) {
    throw new Error(`Please make sure that post data is available.`)
  }

  return (
    <Layout pageTitle={data.title}>
      <div className="mb-8 -mx-4 md:mx-0 rounded-md overflow-hidden">
        <Image
          src={`https:${data.heroImage.fields.file.url}`}
          alt={data.heroImage.fields.title}
          width={700}
          height={366}
          objectFit="cover"
          layout="responsive"
          sizes="(max-width: 400px) 400px, (max-width: 800px) 800px, (max-width: 1200px) 1200px, 1920px"
        />
      </div>

      <Heading>{data.title}</Heading>

      <ArticleInfo>
        {[
          new Intl.DateTimeFormat(`hu`).format(new Date(data.publishDate)),
          data.author.fields.name,
        ].join(` · `)}
      </ArticleInfo>

      <MDXRemote
        {...data.body}
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
                className="text-blue-500 hover:underline"
              >
                {children}
              </a>
            </Link>
          ),
        }}
      />
    </Layout>
  )
}

export async function getStaticPaths() {
  const data = await contentfulClient.getEntries<Post>({
    content_type: `blogPost`,
  })

  return {
    paths: data.items.map(data => ({
      params: {slug: data.fields.slug},
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
    const data = await contentfulClient.getEntries<Post>({
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

    return {
      props: {
        data: {
          ...post.fields,
          body: serializedBody,
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
