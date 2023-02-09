import contentfulClient from '@/lib/contentful-client'
import getAuthorWithRelativeImage from '@/lib/get-author-with-relative-image'
import imageWithRelativeUrl from '@/lib/image-with-relative-url'
import type {ConvertedAuthor} from '@/types/author.types'
import type {ConvertedPost, PostModel} from '@/types/post.types'
import type {Entry} from 'contentful'
import {serialize} from 'next-mdx-remote/serialize'

export default async function convertPost(post: Entry<PostModel>) {
  const mappedTags = await Promise.all(
    post.metadata?.tags.map(tag => contentfulClient.getTag(tag.sys.id)),
  )
  const mappedAuthor = {
    ...(post.fields.author as unknown as ConvertedAuthor),
    fields: getAuthorWithRelativeImage(post.fields.author?.fields),
  }
  const mappedHeroImage = post.fields.heroImage
    ? imageWithRelativeUrl(post.fields.heroImage[0])
    : null
  const serializedBody = await serialize(post.fields.body)
  const convertedPost = post as unknown as ConvertedPost

  const words = post.fields.body.split(` `).length
  const readingTime = Math.ceil(words / 200)

  return {
    ...convertedPost,
    fields: {
      ...convertedPost.fields,
      tags: mappedTags,
      author: mappedAuthor,
      heroImage: mappedHeroImage,
      body: serializedBody,
      readingTime,
    },
  } as ConvertedPost
}
