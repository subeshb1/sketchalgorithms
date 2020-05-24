import React from 'react'

import Layout from './Layout'
import { rhythm } from '../../utils/typography'

class BlogPostTemplate extends React.Component {
  render() {
    return (
      <Layout>
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: 900,
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          {this.props.children}
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate
