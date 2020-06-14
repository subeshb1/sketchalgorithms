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
  return (
    <Layout>
      <Router basepath="/app/games">
        <Games path="/*" />
      </Router>
    </Layout>
  )
})
export default MainApp
