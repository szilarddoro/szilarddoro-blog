# Szilard's Scrapyard

This is a Next.js application powering my personal blog. Contentful's Preview
and Content Delivery APIs are acting as a backend in the background.

Feel free to fork the repository or contribute via
[pull requests](https://github.com/szilarddoro/szilarddoro-blog/pulls).

## Dependencies

- [Contentful](https://contentful.com) - This is for managing your content on an easy to use platform.
- [Cloudinary](https://cloudinary.com) - This is for storing and optimizing your images on the fly.
- [Vercel](https://vercel.com) or [Netlify](https://netlify.com) or any other hosting platform. It's a simply Next app, you can deploy it anywhere.

## Configuring the environment

| Environment variable                | Type      | Description                                                                                                   |
| ----------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------- |
| **CONTENTFUL_ACCESS_TOKEN**         | `string`  | Contentful's Content Delivery API access token                                                                |
| **CONTENTFUL_PREVIEW_ACCESS_TOKEN** | `string`  | Contentful's Content Preview API access token                                                                 |
| **CONTENTFUL_SPACE_ID**             | `string`  | Identifier of your Contentful's space                                                                         |
| **PRIMARY_AUTHOR_ID**               | `string`  | Entry identifier of the primary author, you can omit if you don't wish to display any author on the home page |
| **PREVIEW**                         | `boolean` | Whether or not the page should use the Preview API                                                            |

You can create an `.env.local` file or set these environment variables on the
platform you are building and hosting your blog.

## Running the blog locally

`yarn dev`

Open http://localhost:3000 in your browser. The page will reload every time you
change the code.

## Building the blog locally

`yarn build`

Build your blog locally and see the actual bundle size per page.

## Running the blog locally

`yarn start`

Open http://localhost:3000 in your browser to see the production build.

You can run Lighthouse tests in a private tab to see an approximate result of
how your site will look like once deployed.

## Deploy the blog

There are several platforms that are an awesome choice for hosting your blog such as [Vercel](https://vercel.com) or [Netlify](https://netlify.com).

My own blog runs on [Vercel](https://vercel.com).

## Content models

This blog uses very few content models to let you create your blog posts as fast
as possible.

Below you can find the relevant fields.

### Cloudinary Image

Represents an image. The return value is managed by
[Cloudinary's](http://cloudinary.com) Contentful integration.

| Field        | Type                                           | Description                                                                      |
| ------------ | ---------------------------------------------- | -------------------------------------------------------------------------------- |
| secure_url   | `string`                                       | Secure URL for fetching the image                                                |
| context      | `{ custom: { alt: string; caption: string } }` | Image metadata used for SEO purposes                                             |
| relative_url | `string`                                       | A relative URL for displaying the image. Used by Next Image's Cloudinary loader. |

### Author

Represents an author. There are additional fields returned by Contentful. Check
out the [official Github repository](https://github.com/contentful/contentful.js)
to learn more.

| Field    | Type              | Description                   |
| -------- | ----------------- | ----------------------------- |
| id       | `string`          | Identifier of the author      |
| image    | `CloudinaryImage` | Profile picture of the author |
| name     | `string`          | Name of the author            |
| title    | `string`          | Title of the author           |
| email    | `string`          | Email address of the author   |
| shortBio | `string`          | Short biography of the author |
| twitter  | `string`          | Twitter account of the author |
| github   | `string`          | GitHub account of the author  |

### Blog Post

Represents a blog post. There are additional fields returned by Contentful.
Check out the
[official GitHub repository](https://github.com/contentful/contentful.js) to
learn more.

| Field       | Type                  | Description                                                                         |
| ----------- | --------------------- | ----------------------------------------------------------------------------------- |
| id          | `string`              | Identifier of the blog post                                                         |
| title       | `string`              | Title of the blog post                                                              |
| heroImage   | `CloudinaryImage`     | Hero image used as an Open Graph image and displayed at the start of your blog post |
| body        | `MDXSerializedResult` | A serialized markdown string                                                        |
| slug        | `string`              | Slug of the blog post                                                               |
| description | `string`              | Short description used as a meta description as well                                |
| publishDate | `string`              | Publish date of the blog post                                                       |
| tags        | `Array<Tag>`          | An array of tags provided by Contentful's API                                       |
| author      | `Author`              | Author of the blog post                                                             |
