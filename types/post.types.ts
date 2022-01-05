import {Entry} from 'contentful'

export type Post = {
  id: string
  title: string
  body: string
  slug: string
  description: string
  publishDate: string
  tags: Array<string>
  author: any
  heroImage: Entry<any>
}
