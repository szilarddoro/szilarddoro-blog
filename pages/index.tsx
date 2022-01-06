import {EntryCollection} from 'contentful'
import Image from 'next/image'
import Link from 'next/link'
import ArticleInfo from '../components/article-info'
import Heading, {defaultStyleMap} from '../components/heading'
import Layout from '../components/layout'
import Paragraph from '../components/paragraph'
import contentfulClient from '../lib/contentful-client'
import profilePicture from '../public/szilard-doro-profile-picture.jpg'
import type {Post} from '../types/post.types'

export type HomePageProps = {
  data?: EntryCollection<Post>
}

export default function Home({data}: HomePageProps) {
  if (!data || !data.items) {
    throw new Error(`Blog posts could not be loaded.`)
  }

  return (
    <Layout className="grid">
      <div className="grid grid-flow-col justify-self-start items-center gap-3 mt-3 mb-6">
        <Image
          src={profilePicture}
          alt="Szilard Doro"
          width={56}
          height={56}
          className="rounded-full"
          layout="fixed"
          placeholder="blur"
        />

        <div className="grid">
          <span className="font-bold font-heading text-xl">Szilárd Dóró</span>
          <span className="text-base">Techfüggő, szoftverfejlesztő 📱</span>
        </div>
      </div>

      <div className="grid gap-6 mt-2">
        {data.items.map(item => (
          <section key={item.sys.id}>
            <Link href={`/${item.fields.slug}/`} passHref>
              <a className="text-gray-900 dark:text-white hover:text-blue-500 active:text-blue-600 motion-safe:transition-colors focus-visible:text-blue-500 focus-visible:outline-none">
                <Heading
                  variant="h2"
                  styleMap={{
                    ...defaultStyleMap,
                    h2: `text-3xl font-semibold font-heading leading-snug my-2`,
                  }}
                >
                  {item.fields.title}
                </Heading>

                <Paragraph className="text-gray-900 dark:text-white">
                  {item.fields.description}
                </Paragraph>

                <ArticleInfo>
                  {[
                    new Intl.DateTimeFormat(`hu`).format(
                      new Date(item.fields.publishDate),
                    ),
                    item.fields.author.fields.name,
                  ].join(` · `)}
                </ArticleInfo>
              </a>
            </Link>
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
