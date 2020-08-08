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
      <div className="nepali-date-row">
        <input
          onChange={onNepaliChange}
          type="text"
          value={nepaliString}
          placeholder="Nepali Date"
        />
        <input
          onChange={onEnglishChange}
          type="text"
          value={englishString}
          placeholder="English Date"
        />
        <button className="button" onClick={addConverter}>
          Add More
        </button>
        {!hideDelete && (
          <button className="button" onClick={deleteConverter}>
            Delete
          </button>
        )}
      </div>
      {nepaliFormat && (
        <div>
          Nepali format: {nepaliFormat} <br />
          English Format: {englishFormat}
        </div>
      )}
    </div>
  )
}
