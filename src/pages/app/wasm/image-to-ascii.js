
import React, { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone';
import Layout from '../../../components/Layouts/Layout'
import '../../../utils/wasm-go.js'
import AnsiUp from 'ansi_up';
import ImageToAscii from '../../../app/wasm/ImageToAscii';


function Basic(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input id="file"{...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

export default function ImageToAsciiPage() {
  return (
    <Layout>
     <ImageToAscii/>
    </Layout>
  )
}
