import type {EntryCollection, Tag} from 'contentful'
import type {GetStaticPropsContext} from 'next'
import Link from 'next/link'
import ArticleInfo from '../../components/article-info'
import Heading, {defaultStyleMap} from '../../components/heading'
import Layout from '../../components/layout'
import Paragraph from '../../components/paragraph'
import contentfulClient from '../../lib/contentful-client'
import type {PostModel} from '../../types/post.types'

export type CategoryListPageProps = {
  tag: Tag
  blogPosts?: EntryCollection<PostModel>
  error?: string
}

export default function CategoryList({
  blogPosts,
  tag,
  error,
}: CategoryListPageProps) {
  if (error) {
    throw new Error(error)
  }

  if (!blogPosts || !blogPosts.items) {
    throw new Error(`Blog posts could not be loaded.`)
  }

  return (
    <Layout>
      <Heading variant="h2" component="h1" className="mb-6">
        📁 {tag.name}
      </Heading>

      <div className="grid gap-6 mt-4">
        {blogPosts.items.map(post => (
          <section key={post.sys.id}>
            <Link href={`/${post.fields.slug}/`} passHref>
              <a className="text-gray-900 dark:text-white hover:text-blue-500 active:text-blue-600 motion-safe:transition-colors focus-visible:text-blue-500 focus-visible:outline-none">
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

            <ArticleInfo>
              {new Intl.DateTimeFormat(`hu`).format(
                new Date(post.fields.publishDate),
              )}
              {` · `}
              {post.fields.tags.map(tag => (
                <Link
                  href={`/kategoriak/${tag.sys.id}`}
                  passHref
                  key={tag.sys.id}
                >
                  <a className="hover:text-blue-500 active:text-blue-500 hover:underline">
                    {tag.name}
                  </a>
                </Link>
              ))}
            </ArticleInfo>
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
    let blogPosts = await contentfulClient.getEntries<PostModel>({
      content_type: `blogPost`,
      [`metadata.tags.sys.id[in]`]: id,
    })

    if (!blogPosts) {
      return {
        props: {
          error: `Post not found.`,
        },
      }
    }

    const items = await Promise.all(
      blogPosts.items.map(async item => {
        const tags = await Promise.all(
          item.metadata.tags.map(tag => contentfulClient.getTag(tag.sys.id)),
        )

        return {...item, fields: {...item.fields, tags}}
      }),
    )

    blogPosts = {...blogPosts, items}

    return {
      props: {
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
