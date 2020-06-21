import React, { useEffect } from 'react'
import { Router } from '@reach/router'
import Layout from '../../../components/Layouts/Layout'

import { Link } from 'gatsby'
import NepaliDate from 'nepali-date-converter'

const MainApp = React.memo(() => {
  return (
    <Layout>
      {new NepaliDate().toString()}
      <Router basepath="/app/nepali-date"></Router>
    </Layout>
  )
})
export default MainApp
