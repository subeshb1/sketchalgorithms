import React, { useReducer } from 'react'
import NepaliDate from 'nepali-date-converter'
import moment, { defaultFormat } from 'moment'
global.NepaliDate = NepaliDate
global.moment = moment
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
      nepaliDate: null,
      englishDate: null,
    },
    {},
    {},
  ],
  mode: MODE.NEPALI,
  defaultFormat: 'MM/DD/YYYY',
}
function converterReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_NP':
      const currentNp = state.dates[action.payload.index]
      currentNp.nepaliString = action.payload.value
      currentNp.nepaliDate = convert(currentNp.nepaliString)
      currentNp.englishDate = currentNp.nepaliDate
        ? currentNp.nepaliDate.toJsDate()
        : null
      currentNp.englishString = currentNp.englishDate
        ? moment(currentNp.englishDate).format(state.defaultFormat)
        : ''
      return { ...state }
    case 'CHANGE_EN':
      const currentEn = state.dates[action.payload.index]
      currentEn.englishString = action.payload.value
      currentEn.englishDate = moment(currentEn.englishString)
      currentEn.nepaliDate = currentEn.englishDate.isValid()
        ? convert(currentEn.englishDate.toDate())
        : null
      currentEn.nepaliString = currentEn.nepaliDate
        ? currentEn.nepaliDate.format(state.defaultFormat)
        : ''
      return { ...state }
    default:
      throw new Error()
  }
}
export default function DateConverter() {
  const [state, dispatch] = useReducer(converterReducer, initialState)
  const onChangeFactory = (index, mode) => ({ target: { value } }) => {
    dispatch({ type: `CHANGE_${mode}`, payload: { index, value } })
  }
  return (
    <div>
      {state.dates.map((x, i) => {
        return (
          <DateDisplay
            key={i}
            nepaliString={x.nepaliString || ''}
            englishString={x.englishString || ''}
            onNepaliChange={onChangeFactory(i, MODE.NEPALI)}
            onEnglishChange={onChangeFactory(i, MODE.ENGLISH)}
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
}) {
  return (
    <div>
      <input onChange={onNepaliChange} type="text" value={nepaliString} />
      <input onChange={onEnglishChange} type="text" value={englishString} />
    </div>
  )
}
