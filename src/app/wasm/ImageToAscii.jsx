import React, { useState, useEffect, useReducer, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import '../../utils/wasm-go'
import AnsiUp from 'ansi_up'
import { If } from '../../components/utils'

const go = new Go()
function ImageDropZone({ onFileChange }) {
  const onDrop = useCallback(acceptedFiles => {
    onFileChange(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png,image/jpeg',
    onDrop,
  })
  const { multiple, ...inputProps } = getInputProps()

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input id="file" {...inputProps} />
        <p>Drag 'n' drop some image here, or click to select files</p>
      </div>
    </section>
  )
}
const initialState = {
  loading: false,
  image: null,
  fixedWidth: 140,
  fixedHeight: 50,
  colored: false,
  reversed: false,
}
const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IMAGE':
      const newState = { ...state, image: action.payload }
      return newState
    case 'DISABLE_LOADING':
      return { ...state, loading: false }
    case 'ENABLE_LOADING':
      return { ...state, loading: true }
    default:
      return state
  }
}

async function change(buffer, settings) {
  const div = document.getElementById('console')
  const txt = global.convert(buffer, JSON.stringify(settings))
  const ansi_up = new AnsiUp()
  const html = ansi_up.ansi_to_html(txt)
  div.innerHTML = html
}

export default function ImageToAscii() {
  const [
    { loading, image, fixedWidth, fixedHeight, colored, reversed },
    dispatch,
  ] = useReducer(imageReducer, initialState)
  useEffect(() => {
    WebAssembly.instantiateStreaming(fetch('/main.wasm'), go.importObject)
      .then(result => {
        go.run(result.instance)
      })
      .then(dispatcher('DISABLE_LOADING')())
  }, [])
  const dispatcher = type => payload => dispatch({ type, payload })
  const onFileChange = file => {
    dispatcher('ENABLE_LOADING')()
    let reader = new FileReader()
    reader.onload = function() {
      let arrayBuffer = this.result,
        array = new Uint8Array(arrayBuffer)
      dispatcher('SET_IMAGE')(array)
      dispatcher('CONVERT_TO_ASCII')()
      change(array, { fixedWidth, colored, reversed, fixedHeight }).finally(
        dispatcher('DISABLE_LOADING')
      )
    }
    reader.readAsArrayBuffer(file)
  }
  return (
    <div>
      <If condition={!image}>
        <ImageDropZone onFileChange={onFileChange} />
      </If>
      <If condition={image}>
        <ImageSettings />
      </If>
    </div>
  )
}

function ImageSettings() {
  return (
    <div>
      <pre
        id="console"
        style={{ background: 'black', color: 'white', overflow: 'scroll' }}
      ></pre>
    </div>
  )
}
