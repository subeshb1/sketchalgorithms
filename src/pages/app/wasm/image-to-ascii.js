
import React, {  } from 'react'
import Layout from '../../../components/Layouts/Layout'
import '../../../utils/wasm-go.js'
import ImageToAscii from '../../../app/wasm/ImageToAscii';


export default function ImageToAsciiPage() {
  return (
    <Layout>
      <ImageToAscii />
    </Layout>
  )
}
