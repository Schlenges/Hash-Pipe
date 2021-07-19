import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

const Chip = ({text, isSelected, onSelect, onDeselect, icon=false, remove}) => {

  const handleClick = () => {
    isSelected ? onDeselect(text) : onSelect(text)
  }

  return(
    <div className={`chip ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
      {icon ? <FontAwesomeIcon id="delete" icon={faMinusCircle} style={{ marginRight: "6px" }} onClick={() => remove ? remove() : null} /> : null}
      {text}
    </div>
  )
}

export default Chip