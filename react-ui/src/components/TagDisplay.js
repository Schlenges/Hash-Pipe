import React, { useState, useEffect } from 'react'
import TextBox from './TextBox.js'

const limit = (tags, amount) => {
  let randomTags = []

  for(let i = 0; i < amount; i++){
    if(tags.length <= 0){ break }

    let tag = _getRandom(tags)
    randomTags.push(tag)
    tags = tags.filter(item => item !== tag)
  }

  return randomTags
}

const _getRandom = (tags) => tags[Math.floor(Math.random()*tags.length)]

const TagDisplay = ({label, tags, showChips, hideBtn, onSelect, onDeselect, dynamicTags, inEditMode, mediaCount, amount, loading}) => {
  const [display, setDisplay] = useState([])

  useEffect(() => {
    if(!dynamicTags){ 
      tags.length <= 0 ? setDisplay([]) : setDisplay(tags.map((tag) => [tag, false]))
    } else {
      let [searchResult, categoryResult, selectedTags] = tags
      let categoryTags = categoryResult.map(([tag]) => tag)
      let filteredTags = []

      if(categoryResult.length > 0 && !inEditMode){
        if(searchResult.length > 0){
          filteredTags = searchResult.filter(([tag]) => categoryTags.includes(tag))
        } else{
          filteredTags = categoryResult
        }
      } else {
        let activeCat = [...document.querySelectorAll('#categories .chip')].filter(el => el.classList.contains('selected'))
        if(activeCat.length > 0 && !inEditMode){
          filteredTags = []
        } else {
          filteredTags = searchResult
        }
      }

      if(mediaCount){
        filteredTags = filteredTags.filter(([tag, info]) => info.media_count <= mediaCount)
      }

      filteredTags = filteredTags.map(([tag, info]) => "#" + tag)

      if(amount > 0){
        filteredTags = limit(filteredTags, amount)
      }

      categoryTags = categoryTags.map(tag => '#' + tag)
      setDisplay(filteredTags.map(tag => [tag, inEditMode ? categoryTags.includes(tag) : selectedTags.includes(tag)]))
    }
  }, [tags]) // eslint-disable-line

  return(
    <div className="tag-display">
      <div className="label">{label}</div>
      <TextBox 
        tags={display} 
        showChips={showChips} 
        hideBtn={hideBtn} 
        onSelect={onSelect} 
        onDeselect={onDeselect}
        loading={loading && dynamicTags}
      />
    </div>
  )
}

export default TagDisplay