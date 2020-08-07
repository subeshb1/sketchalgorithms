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
    <div {...getRootProps({ className: 'image-drop-zone' })}>
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
  loading: true,
  image: null,
  fixedWidth: 140,
  fixedHeight: 50,
  colored: false,
  reversed: false,
  scale: 1,
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
    case 'CHANGE_FIELD':
      return { ...state, [action.payload.key]: action.payload.value }
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
    { loading, image, fixedWidth, fixedHeight, colored, reversed, scale },
    dispatch,
  ] = useReducer(imageReducer, initialState)
  useEffect(() => {
    dispatcher('ENABLE_LOADING')()
    WebAssembly.instantiateStreaming(fetch('/main.wasm'), go.importObject)
      .then(result => {
        go.run(result.instance)
      })
      .then(dispatcher('DISABLE_LOADING'))
  }, [])
  const dispatcher = type => payload => dispatch({ type, payload })
  const onFileChange = file => {
    dispatcher('ENABLE_LOADING')()
    let reader = new FileReader()
    reader.onload = function() {
      let arrayBuffer = this.result,
        array = new Uint8Array(arrayBuffer)
      dispatcher('SET_IMAGE')(array)
      change(array, { fixedWidth, colored, reversed, fixedHeight }).finally(
        dispatcher('DISABLE_LOADING')
      )
    }
    reader.readAsArrayBuffer(file)
  }
  const convert = () => {
    dispatcher('ENABLE_LOADING')()
    setTimeout(
      () =>
        change(image, { fixedWidth, colored, reversed, fixedHeight }).finally(
          dispatcher('DISABLE_LOADING')
        ),
      100
    )
  }
  return (
    <div className="image-to-ascii container">
      <div className="menu"></div>
      <ImageSettings
        {...{
          image,
          loading,
          onFileChange,
          convert,
          dispatcher,
          fixedWidth,
          colored,
          reversed,
          scale,
          fixedHeight,
        }}
      />
    </div>
  )
}

function ImageSettings({
  image,
  loading,
  onFileChange,
  convert,
  dispatcher,
  fixedWidth,
  colored,
  reversed,
  fixedHeight,
  scale,
}) {
  const onChange = key => ({ target: { value, checked } }) => {
    dispatcher('CHANGE_FIELD')({
      key,
      value: ['fixedHeight', 'fixedWidth', 'scale'].includes(key)
        ? isNaN(parseFloat(value))
          ? value
          : parseFloat(value)
        : checked,
    })
  }
  return (
    <>
      <div className="drawboard">
        <div className="loader" style={{ display: loading ? 'flex' : 'none' }}>
          <img src="/spinner.svg" alt="loader" className="loader-icon" />
        </div>
        <If condition={!image}>
          <ImageDropZone onFileChange={onFileChange} />
        </If>
        <If condition={image}>
          <div className="ascii-background">
            <pre id="console" style={{ transform: `scale(${scale})` }} />
          </div>
        </If>
      </div>

      <div className="tool-bar">
        <h2>Convert Image to Ascii</h2>
        <label>
          Width
          <input
            type="number"
            step="1"
            min="-1"
            max="10000"
            value={fixedWidth}
            onChange={onChange('fixedWidth')}
            disabled={loading}
          />
        </label>
        <label>
          Height
          <input
            type="number"
            step="1"
            min="-1"
            max="10000"
            value={fixedHeight}
            onChange={onChange('fixedHeight')}
            disabled={loading}
          />
        </label>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={colored}
            onChange={onChange('colored')}
            disabled={loading}
          />
          Colored
        </label>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={reversed}
            onChange={onChange('reversed')}
            disabled={loading}
          />
          Inverted
        </label>
        <label>
          Display Scale
          <input
            type="number"
            value={scale}
            step="0.01"
            min="-1"
            max="10000"
            onChange={onChange('scale')}
            disabled={loading}
          />
        </label>
        <div className="btn-group">
          <button onClick={convert} disabled={loading || !image}>
            Re Generate
          </button>
          <button
            onClick={() =>
              dispatcher('CHANGE_FIELD')({ key: 'image', value: null })
            }
            disabled={loading || !image}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  )
}
