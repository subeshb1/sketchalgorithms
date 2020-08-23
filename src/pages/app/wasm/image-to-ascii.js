
import React, { } from 'react'
import Layout from '../../../components/Layouts/Layout'
import '../../../utils/wasm-go.js'
import ImageToAscii from '../../../app/wasm/ImageToAscii';

import SEO from '../../../components/seo'

export default function ImageToAsciiPage() {
  return (
    <Layout>
      <SEO
        url="/app/wasm/image-to-ascii"
        title="Convert image to text character"
        keywords={[`image to ascii`, `image`, `ascii`, `ansi`, 'convert', 'convert image to ascii']}
        description={"Convert image to ascii on the browser. This tool allows image to be converted in to text without in file upload to the server. It uses WebAssembly to run native code on the browser to convert image to ascii characters."}
      />
      <ImageToAscii />
    </Layout>
  )
}
