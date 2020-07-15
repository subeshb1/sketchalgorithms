import React, { useEffect } from 'react'
import { Router } from '@reach/router'
import Layout from '../../../components/Layouts/Layout'

import { Link } from 'gatsby'
import NepaliDate from 'nepali-date-converter'
import DateConverter from '../../../app/nepali-date/DateConverter'
import SEO from '../../../components/seo'

const MainApp = React.memo(() => {
  return (
    <Layout>
      <SEO
        title="Nepali Date Converter"
        keywords={[`nepali date`, `converter`, `ad to bs`, `bs to ad`, 'nepali date to english date']}
        description={"Convert Nepali date to English date i.e BS to AD and vice versa. This tool is quite handy for bulk conversion and extremely helpful for converting date during EDV form fill up, exporting to excel csv etc. Use the  tool is for converting dates like date of birth, historical nepali dates, passport-visa dates, dates in document translation"}
      />
      <DateConverter />
    </Layout>
  )
})
export default MainApp
