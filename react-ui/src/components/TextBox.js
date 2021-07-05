import React, { useState } from 'react'
import Chip from './Chip.js'

const Button = ({text, handleClick}) => (
  <div id="edit-btn" onClick={handleClick}>
    {text}
  </div>
)

const TextBox = ({hideBtn=false, tags, isChip}) => {
  const [inEdit, setInEdit] = useState(false)

  const buttonClick = () => {
    setInEdit(!inEdit)
  }

  return(
    <div className={`text-box ${inEdit ? 'active' : ''}`}>
      {hideBtn
        ? null
        : <Button handleClick={buttonClick} text={inEdit ? 'done' : 'edit'} />
      }
      <div className="tags">
        {tags.map(tag => isChip 
          ? <Chip 
              text={tag} 
              key={tag} 
              onSelect={() => console.log('selcted')}
              onDeselect={() => console.log('deselcted')}
              icon={inEdit}
            /> 
          : <p>{tag}</p>)}
      </div>
    </div>
  )
}

export default TextBox