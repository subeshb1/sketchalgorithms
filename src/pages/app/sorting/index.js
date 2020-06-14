import React from 'react'
import { Router } from '@reach/router'
import Layout from '../../../components/Layouts/Layout'
import '../../../app/css/index.css'
import {
  Sorting,
  DrawableGraph,
  Graph,
  Home,
  Games,
  TOC,
} from '../../../app/containers'
import App from '../../../app/App'

const MainApp = React.memo(() => {
  const ssr = typeof window === undefined
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
