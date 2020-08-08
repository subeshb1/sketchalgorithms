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

function convertToNepali(
  nepaliString,
  nepaliDateFormat,
  englishDateFormat,
  { nepaliFormatString = '', englishFormatString = '' }
) {
  const nepaliDate = convertNepali(nepaliString)
  const englishDate = nepaliDate ? nepaliDate.toJsDate() : null
  return {
    nepaliString,
    englishString: formatEnglish(englishDate, 'YYYY/MM/DD'),
    nepaliFormat: formatNepali(nepaliDate, nepaliDateFormat),
    englishFormat: formatEnglish(englishDate, englishDateFormat),
    nepaliFormatString,
    englishFormatString,
  }
}

function convertToEnglish(
  englishString,
  nepaliDateFormat,
  englishDateFormat,
  { nepaliFormatString = '', englishFormatString = '' }
) {
  const englishDate = moment(englishString)
  const nepaliDate = englishDate.isValid()
    ? convertNepali(englishDate.toDate())
    : null
  return {
    englishString,
    nepaliString: formatNepali(nepaliDate, 'YYYY/MM/DD'),
    nepaliFormat: formatNepali(nepaliDate, nepaliDateFormat),
    englishFormat: formatEnglish(englishDate, englishDateFormat),
    nepaliFormatString,
    englishFormatString,
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
      nepaliFormatString: '',
      englishFormatString: '',
    },
  ],
  mode: MODE.NEPALI,
  defaultNepaliFormat: 'ddd DD, MMMM YYYY',
  defaultEnglishFormat: 'ddd DD, MMMM YYYY',
  englishFormats: [
    'YYYY/MM/DD',
    'YYYY-MM-DD',
    'DD-MM-YYYY',
    'DD/MM/YYYY',
    'ddd DD, MMMM YYYY',
    'To\\d\\a\\y i\\s ddd DD, MMMM YYYY \\B\\S',
  ],
  nepaliFormats: [
    'YYYY/MM/DD',
    'YYYY-MM-DD',
    'DD-MM-YYYY',
    'DD/MM/YYYY',
    'ddd DD, MMMM YYYY',
    'To\\d\\a\\y i\\s ddd DD, MMMM YYYY \\A\\D',
  ],
}
function converterReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_NP':
      state.dates[action.payload.index] = convertToNepali(
        action.payload.value,
        state.dates[action.payload.index].nepaliFormatString ||
          state.defaultNepaliFormat,
        state.dates[action.payload.index].englishFormatString ||
          state.defaultEnglishFormat,
        state.dates[action.payload.index]
      )
      return { ...state }
    case 'CHANGE_EN':
      state.dates[action.payload.index] = convertToEnglish(
        action.payload.value,
        state.dates[action.payload.index].nepaliFormatString ||
          state.defaultNepaliFormat,
        state.dates[action.payload.index].englishFormatString ||
          state.defaultEnglishFormat,
        state.dates[action.payload.index]
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
    case 'CHANGE_NP_FORMAT':
      const defaultNepaliFormat = action.payload.value
      state.dates.forEach((date, index, array) => {
        const nepaliDate = convertNepali(date.nepaliString)
        const format = date.nepaliFormatString || defaultNepaliFormat
        array[index] = {
          ...date,
          nepaliFormat: nepaliDate ? formatNepali(nepaliDate, format) : '',
        }
      })
      return { ...state, defaultNepaliFormat }
    case 'CHANGE_EN_FORMAT':
      const defaultEnglishFormat = action.payload.value
      state.dates.forEach((date, index, array) => {
        const englishDate = moment(date.englishString)
        const format = date.format || defaultEnglishFormat
        array[index] = {
          ...date,
          englishFormat: englishDate ? formatEnglish(englishDate, format) : '',
        }
      })
      return { ...state, defaultEnglishFormat }
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
    <>
      <select
        value={state.defaultNepaliFormat}
        onChange={onChangeFactory(null, 'NP_FORMAT')}
      >
        {state.nepaliFormats.map((x, i) => {
          return (
            <option value={x} key={i}>
              {new NepaliDate().format(x)}
            </option>
          )
        })}
      </select>
      <select
        value={state.defaultEnglishFormat}
        onChange={onChangeFactory(null, 'EN_FORMAT')}
      >
        {state.englishFormats.map((x, i) => {
          return (
            <option value={x} key={i}>
              {moment().format(x)}
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
    </>
  )
}
