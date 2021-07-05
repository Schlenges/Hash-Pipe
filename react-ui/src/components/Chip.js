import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

const Chip = ({text, isSelected, onSelect, onDeselect, icon=false}) => {

  const handleClick = () => {
    isSelected ? onDeselect(text) : onSelect(text)
  }

  return(
    <div className={`chip ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
      {icon ? <FontAwesomeIcon icon={faMinusCircle} style={{ marginRight: "6px" }} /> : null}
      {text}
    </div>
  )
}

export default Chip