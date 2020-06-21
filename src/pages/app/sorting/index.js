import React from 'react'
import { Router } from '@reach/router'
import Layout from '../../../components/Layouts/Layout'
import { Sorting } from '../../../app/containers'
import AppDisplayLayout from '../../../components/Layouts/AppDisplayLayout'
import { graphql } from 'gatsby'

const MainApp = React.memo(({ data: { sortingAlgo } }) => {
  const ssr = typeof window === 'undefined'
  return (
    <Layout>
      {!ssr ? (
        <Router basepath="/app/sorting">
          <AppDisplayLayout path="/" data={sortingAlgo} category="sorting" />
          <Sorting path="/*" />
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
    sortingAlgo: allApp(filter: { category: { eq: "sorting" } }) {
      nodes {
        title
        url
        description
        category
        name
        image
      }
    }
  }
`
