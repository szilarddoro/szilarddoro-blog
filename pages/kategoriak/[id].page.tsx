import type {EntryCollection, Tag} from 'contentful'
import type {GetStaticPropsContext} from 'next'
import Link from 'next/link'
import ArticleInfo from '../../components/article-info'
import Heading, {defaultStyleMap} from '../../components/heading'
import Layout from '../../components/layout'
import Paragraph from '../../components/paragraph'
import contentfulClient from '../../lib/contentful-client'
import convertPost from '../../lib/convert-post'
import {CloudinaryImageModel} from '../../types/image.types'
import type {ConvertedPostCollection, PostModel} from '../../types/post.types'

export type CategoryListPageProps = {
  tag: Tag
  blogPosts?: EntryCollection<PostModel<CloudinaryImageModel>>
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
    <Layout pageTitle={tag.name}>
      <Heading variant="h4" component="h1" className="mb-4 text-gray-600">
        🗂️ Kategóriák / {tag.name}
      </Heading>

      <div className="grid gap-6 mt-4">
        {blogPosts.items.map(post => (
          <section key={post.sys.id}>
            <Link href={`/${post.fields.slug}/`} passHref>
              <a className="text-gray-900 dark:text-white hover:text-green-500 active:text-green-600 motion-safe:transition-colors focus-visible:text-green-500 focus-visible:outline-none">
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

            <ArticleInfo post={post.fields} />
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
      [`metadata.tags.sys.id[in]`]: id,
    })

    const convertedBlogPosts = await Promise.all(
      rawBlogPosts.items.map(convertPost),
    )

    const blogPosts: ConvertedPostCollection = {
      ...rawBlogPosts,
      items: convertedBlogPosts,
    }

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
