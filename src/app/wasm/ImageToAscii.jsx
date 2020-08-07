import React, { useState, useEffect, useReducer, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import '../../utils/wasm-go'
import AnsiUp from 'ansi_up'
import { If } from '../../components/utils'
import '../../css/page/image-to-ascii.scss'
const go = new Go()
function ImageDropZone({ onFileChange }) {
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.length && onFileChange(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png,image/jpeg',
    onDrop,
  })
  const { multiple, ...inputProps } = getInputProps()

  return (
    <div {...getRootProps({ className: 'image-drop-zone drawboard' })}>
      <input id="file" {...inputProps} />
      <h2>Drop file here or click to upload.</h2>
      <p>
        (Once the image is selected it will converted to ASCII characters on the
        browser.)
      </p>
    </div>
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
  const convert = () => {
    dispatcher('ENABLE_LOADING')()
    change(image, { fixedWidth, colored, reversed, fixedHeight }).finally(
      dispatcher('DISABLE_LOADING')
    )
  }
  return (
    <div className="image-to-ascii container">
      <div className="menu"></div>
      <ImageSettings {...{ image, loading, onFileChange }} />
    </div>
  )
}

function ImageSettings({ image, loading, onFileChange }) {
  return (
    <>
      <If condition={!image && !loading}>
        <ImageDropZone onFileChange={onFileChange} />
      </If>
      <div className="loader" style={{ display: loading ? 'flex' : 'none' }}>
        <img src="/spinner.svg" alt="loader" className="loader-icon" />
      </div>
      <If condition={image}>
        <div className="drawboard ascii-background">
          <pre id="console"></pre>
        </div>
      </If>

      <div className="tool-bar">
        <h2>Convert Image to Ascii</h2>
        <label>
          No of Items
          <input type="number" step="1" min="0" max="10000" />
        </label>
        <label>
          Items Order
          <select>
            <option value="3">Random</option>
            <option value="1">Ascending</option>
            <option value="2">Descending</option>
          </select>
        </label>
        <button> Generate</button>
        <label>
          Step
          <input type="number" />
        </label>
        <label>
          Interval
          <input type="number" step="1" min="1" max="10000" />
        </label>
        <div className="btn-group">
          <button className="green">Sort</button>
          <button className="red">Stop</button>
        </div>
      </div>
    </>
  )
}
