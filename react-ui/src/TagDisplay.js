import React, { useState, useEffect } from 'react'

const TagDisplay = ({tags, setTags, areNew}) => {
  const [readonly, setReadonly] = useState(true)
  const [values, setValues] = useState(tags.map(([key, val]) => '#' + key))

  useEffect(() => { setValues(tags.map(([key]) => '#' + key)) }, [tags])

  const chip = (tag) => <div key={tag} className="chip" onClick={() => removeTag(tag)}>- {tag}</div>

  const removeTag = (tag) => {
    setValues(values.filter(entry => entry !== tag))
  }

  const saveTags = () => {
    setReadonly(!readonly)
    if(!readonly){ setTags(values) }
  }

  return(
    <div id="tag-display">
      {areNew ? <div className="label">New Tags:</div> : null}
      <div className="tags">
        <div id="tag-edit" onClick={saveTags}>
          {readonly ? 'edit' : 'save'}
        </div>
        <div id="tagarea" className={readonly ? '' : 'editable'}>
          {values.map(tag => readonly ? <div key={tag}>{tag}</div> : chip(tag))}
        </div>
      </div>
    </div>
  )
}

export default TagDisplay