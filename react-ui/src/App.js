import React, { useState, useEffect } from 'react'
import TagDisplay from './components/TagDisplay.js'
import SearchBox from './components/SearchBox.js'
import './app.css'

const tags = ["#design", "#designer", "#popdesign"] 

const App = () => {
  const [searchResult, setSearchResult] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  const selectTag = (tag) => {
    if(!selectedTags.includes(tag)){ 
      setSelectedTags([...selectedTags, tag])
    }
  }

  const deselectTag = (tag) => {
    setSelectedTags(selectedTags.filter(item => item !== tag))
  }

  useEffect(() => {
    setSearchResult(tags)
  }, [])

  return(
    <div id="app">
      <div className="column">
        <SearchBox />
      </div>
      <div className="column">
        <TagDisplay 
          label="Search Result" 
          tags={searchResult.map(tag => [tag, selectedTags.includes(tag)])} 
          showChips={true} 
          hideBtn={true}
          onSelect={(tag) => selectTag(tag)}
          onDeselect={(tag) => deselectTag(tag)}
        />
        <TagDisplay 
          label="Selected Tags" 
          tags={selectedTags.map(tag => [tag, false])} 
          showChips={false}
          onSelect={(tag) => deselectTag(tag)}
          onDeselect={() => null} 
        />
      </div>
    </div>
  )
}

export default App