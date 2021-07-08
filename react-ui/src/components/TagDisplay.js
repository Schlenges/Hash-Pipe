import React, { useState, useEffect } from 'react'
import TextBox from './TextBox.js'

const TagDisplay = ({label, tags, showChips, hideBtn, onSelect, onDeselect, dynamicTags}) => {
  const [resultDisplay, setResultDisplay] = useState([])

  useEffect(() => {
    if(!dynamicTags){ 
      setResultDisplay(tags)
    } else{
      let [searchResult, categoryResult, selectedTags] = tags

      if(searchResult.length <= 0){
        let result = categoryResult.map(([tag]) => "#" + tag)
        setResultDisplay(result.map((tag) => [tag, selectedTags.includes(tag)]))
      } else{
        if(categoryResult.length > 0){
          if(categoryResult[0] === 'empty'){ return setResultDisplay([])}
          let catTags = categoryResult.map(([tag]) => "#" + tag)
          let result = searchResult.filter((tag) => catTags.includes(tag))
          setResultDisplay(result.map((tag) => [tag, selectedTags.includes(tag)]))
        } else{
          setResultDisplay(searchResult.map((tag) => [tag, selectedTags.includes(tag)]))
        }
      }
    }
// eslint-disable-next-line
  }, [tags])

  return(
    <div className="tag-display">
      <div className="label">{label}</div>
      <TextBox tags={resultDisplay} showChips={showChips} hideBtn={hideBtn} onSelect={onSelect} onDeselect={onDeselect}/>
    </div>
  )
}

export default TagDisplay