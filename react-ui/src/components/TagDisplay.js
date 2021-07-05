import React from 'react'
import TextBox from './TextBox.js'

const TagDisplay = ({label, tags}) => {
  return(
    <div className="tag-display">
      <div className="label">{label}</div>
      <TextBox tags={tags} isChip={true} />
    </div>
  )
}

export default TagDisplay