import React from 'react'
import { Router } from '@reach/router'
import Layout from '../../../components/Layouts/Layout'
import '../../../app/css/index.css'
import { Graph } from '../../../app/containers'
const MainApp = React.memo(() => {
  return (
    <Layout>
      <Router basepath="/app/graph-search">
        <Graph path="/*" />
      </Router>
    </Layout>
  )
})
export default MainApp
