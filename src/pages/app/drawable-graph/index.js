import React from 'react'
import { Router } from '@reach/router'
import Layout from '../../../components/Layouts/Layout'
import { DrawableGraph } from '../../../app/containers'
import AppDisplayLayout from '../../../components/Layouts/AppDisplayLayout'
import { graphql } from 'gatsby'
const MainApp = React.memo(({ data: { sortingAlgo } }) => {
  const ssr = typeof window === 'undefined'
  return (
    <Layout>
      {!ssr ? (
        <Router basepath="/app/drawable-graph">
          <AppDisplayLayout
            path="/"
            data={sortingAlgo}
            category="drawable-graph"
          />
          <DrawableGraph path="/*" />
        </Router>
      ) : (
        'Loading...'
      )}
    </Layout>
  )
})
export default MainApp

export const pageQuery = graphql`
  query {
    sortingAlgo: allApp(filter: { category: { eq: "drawable-graph" } }) {
      nodes {
        title
        url
        description
        category
        name
      }
    }
  }
`
