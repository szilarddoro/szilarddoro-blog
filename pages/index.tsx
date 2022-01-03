import {EntryCollection} from 'contentful'
import Link from 'next/link'
import Layout from '../components/layout'
import contentfulClient from '../lib/contentful-client'
import {Post} from '../types/post.types'

export type HomePageProps = {
  data?: EntryCollection<Post>
}

export default function Home({data}: HomePageProps) {
  if (!data || !data.items) {
    throw new Error(`Blog posts could not be loaded.`)
  }

  return (
    <Layout>
      <h1 className="text-4xl">Welcome to the blog!</h1>

      <div>
        {data.items.map(item => (
          <section key={item.sys.id}>
            <Link href={`/${item.fields.slug}/`} passHref>
              <a>
                <h2 className="text-3xl">{item.fields.title}</h2>
              </a>
            </Link>

            <p>{item.fields.description}</p>
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
