import React from 'react'
import { Router } from '@reach/router'
import Layout from '../../../components/Layouts/Layout'
import { Sorting } from '../../../app/containers'
import AppDisplayLayout from '../../../components/Layouts/AppDisplayLayout'

const MainApp = React.memo(({ data: { sortingAlgo } }) => {
  return (
    <Layout>
      <Router basepath="/app/sorting">
        <AppDisplayLayout path="/" data={sortingAlgo} category="sorting" />
        <Sorting path="/*" />
      </Router>
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
      }
    }
  }
`
