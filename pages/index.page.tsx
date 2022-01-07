import type {Entry, EntryCollection} from 'contentful'
import Image from 'next/image'
import Link from 'next/link'
import ArticleInfo from '../components/article-info'
import Heading, {defaultStyleMap} from '../components/heading'
import Layout from '../components/layout'
import Paragraph from '../components/paragraph'
import contentfulClient from '../lib/contentful-client'
import type {AuthorModel} from '../types/author.types'
import type {PostModel} from '../types/post.types'

export type HomePageProps = {
  blogPosts?: EntryCollection<PostModel>
  primaryAuthor?: Entry<AuthorModel>
}

export default function Home({blogPosts, primaryAuthor}: HomePageProps) {
  if (!blogPosts || !blogPosts.items) {
    throw new Error(`Blog posts could not be loaded.`)
  }

  return (
    <Layout className="grid">
      {primaryAuthor && (
        <div className="grid grid-flow-col justify-self-start items-center gap-3 mb-4">
          <Image
            src={`https:${primaryAuthor.fields.image.fields.file.url}`}
            alt={primaryAuthor.fields.image.fields.title}
            width={52}
            height={52}
            className="rounded-full"
            layout="fixed"
            priority
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

            <ArticleInfo className="mt-2" post={post.fields} />
          </section>
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  let blogPosts = await contentfulClient.getEntries<PostModel>({
    content_type: `blogPost`,
  })

  if (blogPosts) {
    const items = await Promise.all(
      blogPosts.items.map(async item => {
        const tags = await Promise.all(
          item.metadata.tags.map(tag => contentfulClient.getTag(tag.sys.id)),
        )

        return {...item, fields: {...item.fields, tags}}
      }),
    )

    blogPosts = {...blogPosts, items}
  }

  const primaryAuthorId = process.env.PRIMARY_AUTHOR_ID
  let primaryAuthor: Entry<AuthorModel> | null = null

  if (primaryAuthorId) {
    primaryAuthor = await contentfulClient.getEntry<AuthorModel>(
      primaryAuthorId,
    )
  }

  return {
    props: {
      blogPosts,
      primaryAuthor,
    },
  }
}
