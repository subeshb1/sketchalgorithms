import React from 'react'

import { graphql, Link } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layouts/Layout'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'
import Disqus, { DiscussionEmbed } from 'disqus-react'
import Toc from '../components/Toc'

class BlogPost extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const disqusShortname = 'subeshbhandari'
    console.log(post) 
    const disqusConfig = {
      url: 'https://www.subeshbhandari.com' + post.fields.slug,
      identifier: post.fields.slug,
      title: siteTitle,
    }
    return (
      <Layout>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <div className="blog-main-container">
          {/* <div className="blog-left-container">
            
          </div> */}
          <div className="blog-mid-container">
            <h1>{post.frontmatter.title}</h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >
              {post.frontmatter.date}
            </p>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
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
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
            <Disqus.DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />
          </div>
          <div className="blog-right-container">
          <Toc tableOfContents={post.tableOfContents} />
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPost

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      tableOfContents(absolute: false, pathToSlugField: "", maxDepth: 3)
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      fields {
        slug
      }
    }
  }
`
