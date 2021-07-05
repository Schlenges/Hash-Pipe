import React, { useState } from 'react'
import Chip from './Chip.js'

const Button = ({text, handleClick}) => (
  <div id="edit-btn" onClick={handleClick}>
    {text}
  </div>
)

const TextBox = ({hideBtn=false, tags, showChips, onSelect, onDeselect}) => {
  const [inEdit, setInEdit] = useState(false)
  const [isChip, setIsChip] = useState(showChips)

  const buttonClick = () => {
    setInEdit(!inEdit)
    if(!showChips){ setIsChip(!isChip) }
  }

  return(
    <div className={`text-box ${inEdit ? 'active' : ''}`}>
      {hideBtn
        ? null
        : <Button handleClick={buttonClick} text={inEdit ? 'done' : 'edit'} />
      }
      <div className="tags">
        {tags.map(([tag, isSelected]) => isChip 
          ? <Chip 
              text={tag} 
              key={tag} 
              isSelected={isSelected}
              onSelect={onSelect}
              onDeselect={onDeselect}
              icon={inEdit}
            /> 
          : <li key={tag} >{tag}</li>)}
      </div>
    </div>
  )
}

export default TextBox