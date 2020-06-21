import React from 'react'
import Layout from '../../components/Layouts/Layout'
import AppDisplayLayout from '../../components/Layouts/AppDisplayLayout'
import { graphql } from 'gatsby'
const MainApp = React.memo(({ data: { allApp } }) => {
  return (
    <Layout>
      <AppDisplayLayout path="/" data={allApp} category="all"/>
    </Layout>
  )
})
export default MainApp

export const pageQuery = graphql`
  query {
    allApp {
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
