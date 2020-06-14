import React from 'react'
import { Router } from '@reach/router'
import Layout from '../../../components/Layouts/Layout'
import {
  Sorting,
  DrawableGraph,
  Graph,
  Home,
  Games,
  TOC,
} from '../../../app/containers'

const MainApp = React.memo(() => {
  const ssr = typeof window === "undefined"
  return (
    <Layout>
      {!ssr && (
        <Router basepath="/app/sorting">
          <Sorting path="/*" />
        </Router>
      )}
    </Layout>
  )
})
export default MainApp
