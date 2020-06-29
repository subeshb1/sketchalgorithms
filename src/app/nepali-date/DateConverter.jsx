import React, { useReducer, useState } from 'react'
import NepaliDate from 'nepali-date-converter'
import moment from 'moment'
global.NepaliDate = NepaliDate
global.moment = moment

function formatEnglish(englishDate, format) {
  try {
    if (englishDate) {
      return moment(englishDate).format(format)
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

function convertToNepali(nepaliString, format) {
  const nepaliDate = convert(nepaliString)
  const englishDate = nepaliDate ? nepaliDate.toJsDate() : null
  return {
    nepaliString,
    englishString: formatEnglish(englishDate, format),
  }
}

function convertToEnglish(englishString, format) {
  const englishDate = moment(englishString)
  const nepaliDate = englishDate.isValid()
    ? convert(englishDate.toDate())
    : null
  return {
    englishString,
    nepaliString: formatNepali(nepaliDate, format),
  }
}

function convert(str) {
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
      format: '',
    },
  ],
  mode: MODE.NEPALI,
  defaultFormat: 'YYYY/MM/DD',
}
function converterReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_NP':
      state.dates[action.payload.index] = convertToNepali(
        action.payload.value,
        state.defaultFormat
      )
      return { ...state }
    case 'CHANGE_EN':
      state.dates[action.payload.index] = convertToEnglish(
        action.payload.value,
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
    default:
      throw state
  }
}
export default function DateConverter() {
  const [state, dispatch] = useReducer(converterReducer, initialState)
  const [value, setValue] = useState('')
  const onChangeFactory = (index, mode) => ({ target: { value } }) => {
    dispatch({ type: `CHANGE_${mode}`, payload: { index, value } })
  }
  const indexFactory = (index, type) => () => {
    dispatch({ type, payload: { index } })
  }
  return (
    <div>
      <select>
        <option value=""></option>
      </select>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      {state.dates.map((x, i) => {
        return (
          <DateDisplay
            key={i}
            nepaliString={x.nepaliString || ''}
            englishString={x.englishString || ''}
            onNepaliChange={onChangeFactory(i, MODE.NEPALI)}
            onEnglishChange={onChangeFactory(i, MODE.ENGLISH)}
            addConverter={indexFactory(i, 'ADD_INDEX')}
            deleteConverter={indexFactory(i, 'DELETE_INDEX')}
          />
        )
      })}
    </div>
  )
}

function DateDisplay({
  onNepaliChange,
  onEnglishChange,
  nepaliString,
  englishString,
  addConverter,
  deleteConverter,
}) {
  return (
    <div>
      <input onChange={onNepaliChange} type="text" value={nepaliString} />
      <input onChange={onEnglishChange} type="text" value={englishString} />
      <button onClick={addConverter}>Add More</button>
      <button onClick={deleteConverter}>Delete</button>
    </div>
  )
}
