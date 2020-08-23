import React, { useEffect } from 'react'
import { Router } from '@reach/router'
import Layout from '../../../components/Layouts/Layout'

import { Link } from 'gatsby'
import NepaliDate from 'nepali-date-converter'
import SEO from '../../../components/seo'
const MainApp = React.memo(() => {
  return (
    <Layout>
      <SEO
        url="/app/nepali-date"
        title="Nepali Date Converter"
        keywords={[`nepali date`, `converter`, `ad to bs`, `bs to ad`, 'nepali date to english date']}
        description={"Nepali date today. Find different information about today's date."}
      />
      {new NepaliDate().toString()}
      <Router basepath="/app/nepali-date"></Router>
    </Layout>
  )
})
export default MainApp
