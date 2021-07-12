import React, { useState, useEffect } from 'react'
import TextBox from './TextBox.js'

const TagDisplay = ({label, tags, showChips, hideBtn, onSelect, onDeselect, dynamicTags, inEditMode, maxCount}) => {
  const [resultDisplay, setResultDisplay] = useState([])

  const prepare = (tags) => {
    if(maxCount !== null){
      tags = tags.filter(([tag, info]) => info.media_count <= maxCount)
    }
    return tags.map(([tag]) => "#" + tag)
  }

  useEffect(() => {
    if(!dynamicTags){ 
      tags[0] === 'empty' ? setResultDisplay([]) : setResultDisplay(tags.map((tag) => [tag, false]))
    } else{
      let [searchResult, categoryResult, selectedTags] = tags

      if(searchResult.length <= 0){
        let result = prepare(categoryResult)
        setResultDisplay(result.map((tag) => [tag, selectedTags.includes(tag)]))
      } else{
        let catTags = categoryResult.map(([tag]) => "#" + tag)

        if(categoryResult.length > 0 && !inEditMode){
          let result = prepare(searchResult)
          result = result.filter((tag) => catTags.includes(tag))
          setResultDisplay(result.map((tag) => [tag, selectedTags.includes(tag)]))
        } else{
          let result = prepare(searchResult)
          setResultDisplay(result.map((tag) => [tag, inEditMode ? catTags.includes(tag) : selectedTags.includes(tag)]))
        }
      }
    }
  }, [tags]) // eslint-disable-line

  return(
    <div className="tag-display">
      <div className="label">{label}</div>
      <TextBox tags={resultDisplay} showChips={showChips} hideBtn={hideBtn} onSelect={onSelect} onDeselect={onDeselect}/>
    </div>
  )
}

export default TagDisplay