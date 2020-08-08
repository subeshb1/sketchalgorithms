import React from 'react'

export default function DateDisplay({
  onNepaliChange,
  onEnglishChange,
  nepaliString,
  nepaliFormat,
  englishString,
  englishFormat,
  addConverter,
  hideDelete,
  deleteConverter,
}) {
  return (
    <div>
      <input onChange={onNepaliChange} type="text" value={nepaliString} />
      <input onChange={onEnglishChange} type="text" value={englishString} />
      <button className="button" onClick={addConverter}>
        Add More
      </button>
      {!hideDelete && (
        <button className="button" onClick={deleteConverter}>
          Delete
        </button>
      )}
      <div>{nepaliFormat && `${nepaliFormat} || ${englishFormat}`}</div>
    </div>
  )
}
