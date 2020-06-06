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
import { If } from '../components/utils'
import { Helmet } from 'react-helmet'

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
    const script = document.createElement('script')

    script.src = 'https://buttons.github.io/buttons.js'
    script.async = true

    document.body.appendChild(script)
  }, [])
  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <div className="blog-main-container">
        <SideBar
          seriesElements={props.data.allMarkdownRemark.edges.map(x => ({
            ...x.node.frontmatter,
            ...x.node.fields,
          }))}
        />

        <main className="blog-mid-container blog-post-content">
          <h1>{post.frontmatter.title}</h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            <span className="blog-date">{post.frontmatter.date}</span>
            <If
              condition={
                post.frontmatter.hideEstimatedTime == null ||
                !post.frontmatter.hideEstimatedTime
              }
            >
              <span className="estimated-reading-time">
                {post.timeToRead} minute{post.timeToRead == 1 ? '' : 's'} read
              </span>
            </If>
          </p>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
          <If
            condition={
              post.frontmatter.hideDisqus == null ||
              !post.frontmatter.hideDisqus
            }
          >
            <Disqus.DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />
          </If>
        </main>
        <If
          condition={
            post.frontmatter.hideLeftBar == null ||
            !post.frontmatter.hideLeftBar
          }
        >
          <aside className="blog-right-container">
            <Toc tableOfContents={post.tableOfContents} />
          </aside>
        </If>
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
        hideDisqus
        githubButtons
        hideEstimatedTime
        hideLeftBar
        date(formatString: "MMMM DD, YYYY")
      }
      timeToRead
      fields {
        slug
      }
    }
    allMarkdownRemark(
      sort: { fields: frontmatter___position, order: ASC }
      filter: { frontmatter: { series: { eq: $series } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            type
            series
            category
            position
          }
        }
      }
    }
  }
`
