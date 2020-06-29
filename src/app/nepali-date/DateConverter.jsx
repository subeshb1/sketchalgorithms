import React, { useReducer, useState } from 'react'
import NepaliDate from 'nepali-date-converter'
import moment from 'moment'
import DateDisplay from './DateDisplay'
global.NepaliDate = NepaliDate
global.moment = moment
function formatEnglish(englishDate, format) {
  try {
    if (englishDate) {
      return moment(englishDate).format(
        format.replace(/d{2,4}/g, string => string + 'd')
      )
    }
  } catch {
    return ''
  }
  return ''
}

function formatNepali(nepaliDate, format) {
  if (nepaliDate) {
    return nepaliDate.format(format)
  }
  return ''
}

function convertToNepali(nepaliString, format, defaultFormat) {
  const currentFormat = format || defaultFormat
  const nepaliDate = convertNepali(nepaliString)
  const englishDate = nepaliDate ? nepaliDate.toJsDate() : null
  return {
    nepaliString,
    englishString: formatEnglish(englishDate, 'YYYY/MM/DD'),
    nepaliFormat: formatNepali(nepaliDate, currentFormat),
    englishFormat: formatEnglish(englishDate, currentFormat),
    format,
  }
}

function convertToEnglish(englishString, format, defaultFormat) {
  const currentFormat = format || defaultFormat
  const englishDate = moment(englishString)
  const nepaliDate = englishDate.isValid()
    ? convertNepali(englishDate.toDate())
    : null
  return {
    englishString,
    nepaliString: formatNepali(nepaliDate, 'YYYY/MM/DD'),
    nepaliFormat: formatNepali(nepaliDate, currentFormat),
    englishFormat: formatEnglish(englishDate, currentFormat),
    format,
  }
}

function convertNepali(str) {
  try {
    return new NepaliDate(str)
  } catch {
    return null
  }
}

const MODE = {
  NEPALI: 'NP',
  ENGLISH: 'EN',
}
const initialState = {
  dates: [
    {
      nepaliString: '',
      englishString: '',
      nepaliFormat: '',
      englishFormat: '',
      format: '',
    },
  ],
  mode: MODE.NEPALI,
  defaultFormat: 'ddd DD, MMMM YYYY',
  formats: [
    'YYYY/MM/DD',
    'YYYY-MM-DD',
    'DD-MM-YYYY',
    'DD/MM/YYYY',
    'ddd DD, MMMM YYYY',
    'To\\d\\a\\y i\\s ddd DD, MMMM YYYY',
  ],
}
function converterReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_NP':
      state.dates[action.payload.index] = convertToNepali(
        action.payload.value,
        state.dates[action.payload.index].format,
        state.defaultFormat
      )
      return { ...state }
    case 'CHANGE_EN':
      state.dates[action.payload.index] = convertToEnglish(
        action.payload.value,
        state.dates[action.payload.index].format,
        state.defaultFormat
      )
      return { ...state }
    case 'ADD_INDEX':
      state.dates.splice(action.payload.index + 1, 0, {})
      return { ...state }
    case 'DELETE_INDEX':
      if (state.dates.length === 1) {
        return state
      }
      state.dates.splice(action.payload.index, 1)
      return { ...state }
    case 'CHANGE_FORMAT':
      const defaultFormat = action.payload.value
      state.dates.forEach((date, index, array) => {
        const englishDate = moment(date.englishString)
        const nepaliDate = convertNepali(date.nepaliString)
        const format = date.format || defaultFormat
        array[index] = {
          ...date,
          nepaliFormat: nepaliDate ? formatNepali(nepaliDate, format) : '',
          englishFormat: englishDate ? formatEnglish(englishDate, format) : '',
        }
      })
      return { ...state, defaultFormat }
    default:
      throw state
  }
}
export default function DateConverter() {
  const [state, dispatch] = useReducer(converterReducer, initialState)
  const onChangeFactory = (index, mode) => ({ target: { value } }) => {
    dispatch({ type: `CHANGE_${mode}`, payload: { index, value } })
  }
  const indexFactory = (index, type) => () => {
    dispatch({ type, payload: { index } })
  }
  return (
    <div>
      <select
        value={state.defaultFormat}
        onChange={onChangeFactory(null, 'FORMAT')}
      >
        {state.formats.map((x, i) => {
          return (
            <option value={x} key={i}>
              {new NepaliDate().format(x)}
            </option>
          )
        })}
      </select>
      {state.dates.map((x, i) => {
        return (
          <DateDisplay
            key={i}
            hideDelete={state.dates.length === 1}
            nepaliString={x.nepaliString || ''}
            englishString={x.englishString || ''}
            onNepaliChange={onChangeFactory(i, MODE.NEPALI)}
            onEnglishChange={onChangeFactory(i, MODE.ENGLISH)}
            addConverter={indexFactory(i, 'ADD_INDEX')}
            deleteConverter={indexFactory(i, 'DELETE_INDEX')}
            nepaliFormat={x.nepaliFormat}
            englishFormat={x.englishFormat}
          />
        )
      })}
    </div>
  )
}
