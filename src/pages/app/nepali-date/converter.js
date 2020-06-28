import React, { useEffect } from 'react'
import { Router } from '@reach/router'
import Layout from '../../../components/Layouts/Layout'

import { Link } from 'gatsby'
import NepaliDate from 'nepali-date-converter'
import DateConverter from '../../../app/nepali-date/DateConverter'

const MainApp = React.memo(() => {
  return (
    <Layout>
      <DateConverter />
    </Layout>
  )
})
export default MainApp
