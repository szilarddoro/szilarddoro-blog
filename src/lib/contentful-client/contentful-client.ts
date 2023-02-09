import {createClient} from 'contentful'

export default createClient({
  accessToken:
    (process.env.PREVIEW === `true`
      ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
      : process.env.CONTENTFUL_ACCESS_TOKEN) || '',
  space: process.env.CONTENTFUL_SPACE_ID || '',
  host:
    process.env.PREVIEW === `true`
      ? `preview.contentful.com`
      : `cdn.contentful.com`,
})
