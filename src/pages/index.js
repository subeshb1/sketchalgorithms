import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'
import BlogPostTemplate from '../components/Layouts/BlogLayout'

class BlogHome extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allMarkdownRemark.edges

    return (
      <BlogPostTemplate>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        {posts.map(
          ({
            node: {
              frontmatter: { title, description, date } = {},
              fields: { slug } = {},
            } = {},
          }) => {
            description = description ? description : ''
            return (
              <div key={title || slug}>
                <h1
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link to={slug}>{title}</Link>
                </h1>
                <small>{date}</small>
                <p>
                  {description.length > 200
                    ? description.slice(0, 200) + '...'
                    : description}
                </p>
              </div>
            )
          }
        )}
      </BlogPostTemplate>
    )
  }
}

export default BlogHome

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        timeToRead: {}
        frontmatter: { type: { ne: "doc" }, draft: { ne: true } }
      }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
