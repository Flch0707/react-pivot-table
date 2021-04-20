import React from 'react'

const DtSelectBox = ({ label = "", id, options, disabled = false }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select disabled={disabled} name={id} id={id}>
        {options && options.map((option, i) => {
          return <option
            selected={option.selected}
            key={i}
            value={option.value}>{option.text}</option>
        })}
      </select>
    </div>
  )
}

export default DtSelectBox
