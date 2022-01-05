import {EntryCollection} from 'contentful'
import Link from 'next/link'
import ArticleInfo from '../components/article-info'
import Heading, {defaultStyleMap} from '../components/heading'
import Layout from '../components/layout'
import Paragraph from '../components/paragraph'
import contentfulClient from '../lib/contentful-client'
import type {Post} from '../types/post.types'

export type HomePageProps = {
  data?: EntryCollection<Post>
}

export default function Home({data}: HomePageProps) {
  if (!data || !data.items) {
    throw new Error(`Blog posts could not be loaded.`)
  }

  return (
    <Layout>
      <div className="grid gap-8 mt-3">
        {data.items.map(item => (
          <section key={item.sys.id}>
            <Link href={`/${item.fields.slug}/`} passHref>
              <a className="text-gray-900 hover:text-blue-500 active:text-blue-600 motion-safe:transition-colors focus-visible:text-blue-500 focus-visible:outline-none">
                <Heading
                  variant="h2"
                  styleMap={{
                    ...defaultStyleMap,
                    h2: `text-3xl font-semibold font-heading`,
                  }}
                >
                  {item.fields.title}
                </Heading>
              </a>
            </Link>

            <ArticleInfo>
              {[
                new Intl.DateTimeFormat(`hu`).format(
                  new Date(item.fields.publishDate),
                ),
                item.fields.author.fields.name,
              ].join(` · `)}
            </ArticleInfo>

            <Paragraph>{item.fields.description}</Paragraph>
          </section>
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await contentfulClient.getEntries<Post>({
    content_type: `blogPost`,
  })

  return {
    props: {
      data,
    },
  }
}
