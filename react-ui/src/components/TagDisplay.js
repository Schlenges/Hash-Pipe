import React from 'react'
import TextBox from './TextBox.js'

const TagDisplay = ({label, tags, showChips, hideBtn, onSelect, onDeselect}) => {
  return(
    <div className="tag-display">
      <div className="label">{label}</div>
      <TextBox tags={tags} showChips={showChips} hideBtn={hideBtn} onSelect={onSelect} onDeselect={onDeselect}/>
    </div>
  )
}

export default TagDisplay