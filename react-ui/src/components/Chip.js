import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

const Chip = ({text, selected=false, onSelect, onDeselect, icon=false}) => {
  const [isSelected, setIsSelected] = useState(selected)

  const handleClick = (event) => {
    let classes = event.target.classList
    isSelected ? onDeselect() : onSelect()
    isSelected ? classes.remove('selected') : classes.add('selected')
    setIsSelected(!isSelected)
  }

  return(
    <div className="chip" onClick={handleClick}>
      {icon ? <FontAwesomeIcon icon={faMinusCircle} style={{ marginRight: "6px" }} /> : null}
      {text}
    </div>
  )
}

export default Chip