import React from 'react'

const RadioButton = ({text, handleClick, isSelected}) => {

  return(
    <span className="radio" onClick={handleClick}>
      <div className="radio-btn"/>
      <span className="checkmark" style={{visibility: isSelected ? 'visible' : 'hidden'}}></span>
      <div className="label">{text}</div>
    </span>
  )
}

export default RadioButton