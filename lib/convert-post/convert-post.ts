import type {Entry} from 'contentful'
import {serialize} from 'next-mdx-remote/serialize'
import type {ConvertedAuthor} from '../../types/author.types'
import type {ConvertedPost, PostModel} from '../../types/post.types'
import contentfulClient from '../contentful-client'
import getAuthorWithRelativeImage from '../get-author-with-relative-image'
import imageWithRelativeUrl from '../image-with-relative-url'

export default async function convertPost(post: Entry<PostModel>) {
  const mappedTags = await Promise.all(
    post.metadata.tags.map(tag => contentfulClient.getTag(tag.sys.id)),
  )
  const mappedAuthor = {
    ...(post.fields.author as unknown as ConvertedAuthor),
    fields: getAuthorWithRelativeImage(post.fields.author.fields),
  }
  const mappedHeroImage = imageWithRelativeUrl(post.fields.heroImage[0])
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
