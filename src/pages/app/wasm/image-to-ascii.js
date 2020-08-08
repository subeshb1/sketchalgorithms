
import React, { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone';
import Layout from '../../../components/Layouts/Layout'
import '../../../utils/wasm-go.js'
import AnsiUp from 'ansi_up';
import ImageToAscii from '../../../app/wasm/ImageToAscii';


export default function ImageToAsciiPage() {
  return (
    <Layout>
      <ImageToAscii />
    </Layout>
  )
}
