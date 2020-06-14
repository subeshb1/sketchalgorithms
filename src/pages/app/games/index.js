import React from 'react'
import { Router } from '@reach/router'
import Layout from '../../../components/Layouts/Layout'
import { Games } from '../../../app/containers'
import AppDisplayLayout from '../../../components/Layouts/AppDisplayLayout'
import { graphql } from 'gatsby'
const MainApp = React.memo(({ data: { games } }) => {
  const ssr = typeof window === 'undefined'

  return (
    <Layout>
      {!ssr ? (
        <Router basepath="/app/games">
          <AppDisplayLayout path="/" data={games} category="games" />
          <Games path="/*" />
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
    games: allApp(filter: { category: { eq: "games" } }) {
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
