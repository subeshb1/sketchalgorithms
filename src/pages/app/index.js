import React, { useEffect } from 'react'
import { Router } from '@reach/router'
import Layout from '../../components/Layouts/Layout'

import { Provider } from 'react-redux'

import store from '../../app/store'
import App from '../../app/App'
import { Link } from 'gatsby'
function Test() {
  return 'Hello'
}

const MainApp = React.memo(() => {
  return <Layout>App path</Layout>
})
export default MainApp
