import React, { useEffect } from 'react'

import { graphql, Link } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layouts/Layout'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'
import Disqus from 'disqus-react'
import Toc from '../components/Toc'
import SideBar from '../components/SideBar'
import { useCopyToClipboard } from 'react-use'

function BlogPost(props) {
  const post = props.data.markdownRemark
  const siteTitle = props.data.site.siteMetadata.title

  const { previous, next } = props.pageContext
  const disqusShortname = 'subeshbhandari'
  const disqusConfig = {
    url: 'https://www.subeshbhandari.com' + post.fields.slug,
    identifier: post.fields.slug,
    title: siteTitle,
  }
  const [, copyToClipboard] = useCopyToClipboard()

  useEffect(() => {
    document.querySelectorAll('.grvsc-container').forEach(codeContainer => {
      if (!codeContainer.querySelector('button')) {
        var button = document.createElement('button')
        button.onclick = () => {
          copyToClipboard(codeContainer.querySelector('.grvsc-code').innerText)
        }
        codeContainer.prepend(button)
      }
    })
  }, [])
  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <div className="blog-main-container">
        <SideBar
          seriesElements={props.data.allMarkdownRemark.edges.map(
            x => x.node.frontmatter
          )}
        />

        <main className="blog-mid-container">
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
        </main>
        <aside className="blog-right-container">
          <Toc tableOfContents={post.tableOfContents} />
        </aside>
      </div>
    </Layout>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query($slug: String!, $series: String) {
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
    allMarkdownRemark(filter: { frontmatter: { series: { eq: $series } } }) {
      edges {
        node {
          frontmatter {
            title
            date
            type
          }
        }
      }
    }
  }
`
