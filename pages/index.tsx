import {EntryCollection} from 'contentful'
import Image from 'next/image'
import Link from 'next/link'
import Heading from '../components/heading'
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
    <Layout>
      <div className="grid">
        <Image
          src={profilePicture}
          alt="Szilard Doro"
          width={104}
          height={104}
          className="rounded-full"
          layout="fixed"
        />
      </div>

      <div>
        {data.items.map(item => (
          <section key={item.sys.id}>
            <Link href={`/${item.fields.slug}/`} passHref>
              <a className="text-gray-900 hover:text-blue-500 active:text-blue-600 motion-safe:transition-colors focus-visible:text-blue-500 focus-visible:outline-none">
                <Heading variant="h2">{item.fields.title}</Heading>
              </a>
            </Link>

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
