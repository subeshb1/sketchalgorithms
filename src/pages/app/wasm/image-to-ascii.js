
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
  // useEffect(() => {
  //   let buffer;
  //   document.querySelector("#file").addEventListener(
  //     "change",
  //     function () {
  //       var reader = new FileReader();
  //       reader.onload = function () {
  //         var arrayBuffer = this.result,
  //           array = new Uint8Array(arrayBuffer);
  //         buffer = array;
  //         var txt = convert(
  //           array,
  //           JSON.stringify({
  //             fixedWidth: 100,
  //             colored: false,
  //             fixedHeight: 40,
  //           })
  //         );
  //         var ansi_up = new AnsiUp();

  //         var html = ansi_up.ansi_to_html(txt);

  //         var cdiv = document.getElementById("console");

  //         cdiv.innerHTML = html;
  //       };
  //       reader.readAsArrayBuffer(this.files[0]);
  //     },
  //     false
  //   );
  //   async function change(val) {
  //     var txt = convert(buffer, JSON.stringify(val));
  //     var ansi_up = new AnsiUp();

  //     var html = ansi_up.ansi_to_html(txt);

  //     var cdiv = document.getElementById("console");

  //     cdiv.innerHTML = html;
  //   }
  //   const go = new Go();
  //   WebAssembly.instantiateStreaming(
  //     fetch("/main.wasm"),
  //     go.importObject
  //   ).then((result) => {
  //     go.run(result.instance);
  //   });

  // }, [])
  return (
    <Layout>
     <ImageToAscii/>
    </Layout>
  )
}
