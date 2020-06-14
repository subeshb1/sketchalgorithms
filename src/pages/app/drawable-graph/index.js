import React from 'react'
import { Router } from '@reach/router'
import Layout from '../../../components/Layouts/Layout'
import App from '../../../app/App'
import '../../../app/css/index.css'
import { DrawableGraph } from '../../../app/containers'

const MainApp = React.memo(() => {
  return (
    <Layout>
      <DrawableGraph path="/*" />
    </Layout>
  )
})
export default MainApp
