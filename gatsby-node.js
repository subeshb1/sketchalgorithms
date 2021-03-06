const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const appRoutes = require('./app-routes')
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              tableOfContents(absolute: false, pathToSlugField: "", maxDepth: 3)
              frontmatter {
                title
                series
                type
              }
              timeToRead
              wordCount {
                paragraphs
                words
                sentences
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          series: post.node.frontmatter.series || 'null',
          previous,
          next,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    let value
    if (node.frontmatter.type === 'doc') {
      value = `${createFilePath({ node, getNode }).replace(/\/$/, '')}`
    } else {
      value = `/blog${createFilePath({ node, getNode }).replace(/\/$/, '')}`
    }

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  const clientPages = [
    '/app/sorting',
    '/app/graph-search',
    '/app/games',
    '/app/drawable-graph',
  ]
  clientPages.map(name => {
    // Only update the `/app` page.
    if (page.path.includes(name)) {
      // page.matchPath is a special key that's used for matching pages
      // with corresponding routes only on the client.
      page.matchPath = `${name}/*`
      // Update the page.
      createPage(page)
    }
  })
}

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions

  // loop through data and create Gatsby nodes
  Object.entries(appRoutes.apps).forEach(([type, item]) => {
    Object.entries(item).forEach(([name, content]) => {
      createNode({
        ...content,
        category: type,
        name: name,
        id: createNodeId(`${type}-${content.url}`),
        parent: null,
        children: [],
        internal: {
          type: 'app',
          content: JSON.stringify(content),
          contentDigest: createContentDigest(content),
        },
      })
    })
  })

  return
}
