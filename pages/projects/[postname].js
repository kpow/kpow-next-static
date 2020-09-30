import Link from 'next/link'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'

import Layout from '@components/Layout'
import getSlugs from '@utils/getSlugs'

export default function BlogPost({ siteTitle, frontmatter, markdownBody }) {
  if (!frontmatter) return <></>

  return (
      <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
        <article>
          <h1>{frontmatter.title}</h1>
          {frontmatter.hero_image && (
            <img
              src={frontmatter.hero_image}
              width="100%"
              className="hero"
              alt={frontmatter.title}
            />
          )}
          <div>
            <ReactMarkdown source={markdownBody} />
          </div>
        </article>
        <div className="back">
          ←{' '}
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </div>
      </Layout>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { postname } = ctx.params

  const content = await import(`../../projects/${postname}.md`)
  const config = await import(`../../siteconfig.json`)
  const data = matter(content.default)

  return {
    props: {
      siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}


// used by next for static render
export async function getStaticPaths() {
  const blogSlugs = ((context) => {
    return getSlugs(context)
  })(require.context('../../projects', true, /\.md$/))

  const paths = blogSlugs.map((slug) => `/projects/${slug}`)

  return {
    paths, // An array of path names, and any params
    fallback: false, // so that 404s properly appear if something's not matching
  }
}
