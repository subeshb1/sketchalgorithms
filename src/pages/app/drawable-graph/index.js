import React from 'react'
import { Router } from '@reach/router'
import Layout from '../../../components/Layouts/Layout'
import { DrawableGraph } from '../../../app/containers'
const MainApp = React.memo(() => {
  const ssr = typeof window === "undefined"
  return (
    <Layout>
      {!ssr && (
        <Router basepath="/app/drawable-graph">
          <DrawableGraph path="/*" />
        </Router>
      )}
    </Layout>
  )
})
export default MainApp
