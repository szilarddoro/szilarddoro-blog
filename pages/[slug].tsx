import {createClient} from 'contentful'
import {GetStaticPropsContext} from 'next'
import {MDXRemote, MDXRemoteSerializeResult} from 'next-mdx-remote'
import {serialize} from 'next-mdx-remote/serialize'
import {NextSeo} from 'next-seo'
import Link from 'next/link'
import {PropsWithChildren} from 'react'
import Heading from '../components/heading'
import Layout from '../components/layout'
import Paragraph from '../components/paragraph'
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
    <Layout>
      <NextSeo title={data.title} titleTemplate="%s — blog.szilarddoro.com" />

      <h1 className="text-4xl font-heading font-bold">{data.title}</h1>

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
          p: Paragraph,
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
  const client = createClient({
    accessToken: `w7aSetSZiCarPRaXjxx7-NC37vlsB6SE6YPFa9LyAE4`,
    space: `fbxa3p3iv97z`,
  })

  const data = await client.getEntries<Post>({content_type: `blogPost`})

  return {
    paths: data.items.map(item => ({
      params: {slug: item.fields.slug},
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
    const client = createClient({
      accessToken: `w7aSetSZiCarPRaXjxx7-NC37vlsB6SE6YPFa9LyAE4`,
      space: `fbxa3p3iv97z`,
    })
    const {slug} = params
    const data = await client.getEntries<Post>({
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
