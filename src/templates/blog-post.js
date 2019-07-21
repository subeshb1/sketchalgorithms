import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'
import Disqus from 'disqus-react'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const disqusShortname = 'sketchalgorithm'
    const disqusConfig = {
      url: window.url,
      identifier: window.url,
      title: siteTitle,
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <h1>{post.frontmatter.title}</h1>
        <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>
          Comments
        </Disqus.CommentCount>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
          }}
        >
          {post.frontmatter.date}
        </p>
        <MDXRenderer>{post.code.body}</MDXRenderer>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <AniLink paintDrip to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </AniLink>
            )}
          </li>
          <li>
            {next && (
              <AniLink paintDrip to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </AniLink>
            )}
          </li>
        </ul>

        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      code {
        body
      }
    }
  }
`
