import React from 'react'
import Layout from '../../components/Layouts/Layout'
import AppDisplayLayout from '../../components/Layouts/AppDisplayLayout'
const MainApp = React.memo(({ data: { allApp } }) => {
  return (
    <Layout>
      <AppDisplayLayout path="/" data={allApp} />
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
      }
    }
  }
`
