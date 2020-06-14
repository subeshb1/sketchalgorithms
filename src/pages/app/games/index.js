import React from 'react'
import { Router } from '@reach/router'
import Layout from '../../../components/Layouts/Layout'
import {
  DrawableGraph,
  Graph,
  Home,
  Games,
  TOC,
} from '../../../app/containers'
const MainApp = React.memo(() => {
  return (
    <Layout>
      <Router basepath="/app/games">
        <Games path="/*" />
      </Router>
    </Layout>
  )
})
export default MainApp
