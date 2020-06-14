import React from 'react'
import { Router } from '@reach/router'
import Layout from '../../../components/Layouts/Layout'
import App from '../../../app/App'
import '../../../app/css/index.css'
import { DrawableGraph } from '../../../app/containers'
function Test() {
  return <div>hello</div>
}
const MainApp = React.memo(() => {
  const ssr = typeof window === undefined
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
