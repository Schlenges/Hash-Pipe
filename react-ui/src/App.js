/* eslint-disable */
import React, { useState, useEffect } from 'react'
import TagDisplay from './components/TagDisplay.js'
import Searchbox from './components/Searchbox.js'
import Categories from './components/Categories.js'
import './App.css'

const App = () => {
  const [searchResult, setSearchResult] = useState([])
  const [categoryResult, setCategoryResult] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  useEffect(() => {
    fetch('/api/')
      .then((response) => response.json())
      .then(data => {
        setSelectedTags(data)
        setSearchResult(data)
      })
  }, [])
  
  const selectTag = (tag) => {
    if(!selectedTags.includes(tag)){ 
      setSelectedTags([...selectedTags, tag])
    }
  }

  const deselectTag = (tag) => {
    setSelectedTags(selectedTags.filter(item => item !== tag))
  }

  return(
    <div id="app">
      <div className="column">
        <Searchbox setSearchResult={setSearchResult} categoryResult={categoryResult.map(([tag]) => tag)} />
        <Categories setCategoryResult={setCategoryResult} setSearchResult={setSearchResult} />
      </div>
      <div className="column">
        <TagDisplay 
          label="Search Result" 
          tags={[searchResult, categoryResult, selectedTags]} 
          dynamicTags={true}
          showChips={true} 
          hideBtn={true}
          onSelect={(tag) => selectTag(tag)}
          onDeselect={(tag) => deselectTag(tag)}
        />
        <TagDisplay 
          label="Selected Tags" 
          tags={selectedTags.map(tag => [tag, false])} 
          showChips={false}
          onSelect={(tag) => setSelectedTags(selectedTags.filter(item => item !== tag))}
          onDeselect={() => null} 
        />
      </div>
    </div>
  )
}

export default App