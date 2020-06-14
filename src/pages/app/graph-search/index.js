import React from 'react'
import { Router } from '@reach/router'
import Layout from '../../../components/Layouts/Layout'
import AppDisplayLayout from '../../../components/Layouts/AppDisplayLayout'
import { Graph } from '../../../app/containers'
import { graphql } from 'gatsby'
const MainApp = React.memo(({ data: { graphSearch } }) => {
  const ssr = typeof window === 'undefined'
  return (
    <Layout>
      {!ssr ? (
        <Router basepath="/app/graph-search">
          <AppDisplayLayout
            path="/"
            data={graphSearch}
            category="graph-search"
          />
          <Graph path="/*" />
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
    graphSearch: allApp(filter: { category: { eq: "graph-search" } }) {
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
