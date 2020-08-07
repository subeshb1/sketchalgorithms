import React, { useState, useEffect, useReducer, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import '../../utils/wasm-go'
import AnsiUp from 'ansi_up'
import { If } from '../../components/utils'

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
  fixedHeight: 20,
  colored: false,
  reversed: false,
}
const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IMAGE':
      break

    default:
      break
  }
}
export default function ImageToAscii() {
  const [
    { loading, image, fixedWidth, fixedHeight, colored, reversed },
    dispatch,
  ] = useReducer(imageReducer, initialState)
  const dispatcher = type => payload => dispatch({ type, payload })
  return (
    <div>
      <If condition={!image}>
        <ImageDropZone useCallback={dispatcher('SET_IMAGE')} />
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
