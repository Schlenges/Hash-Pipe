import React, { useState, useEffect } from 'react'
import TagDisplay from './components/TagDisplay.js'
import Searchbox from './components/Searchbox.js'
import Categories from './components/Categories.js'
import Save from './components/Save.js'
import './App.css'

const App = () => {
  const [searchResult, setSearchResult] = useState([])
  const [categoryResult, setCategoryResult] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [inEditMode, setInEditMode] = useState(false)

  useEffect(() => {
    fetch('/api/')
      .then((response) => response.json())
      .then(data => {
        setSelectedTags(data)
        setSearchResult(data)
      })
  }, [])

  const _findActiveCat = () => {
    let el = document.querySelector('.chip-set > .chip.selected')
    return el !== null ? el.textContent : ''
  }
  
  const selectTag = (tag) => {
    if(!inEditMode){ 
      if(!selectedTags.includes(tag)){ 
        setSelectedTags([...selectedTags, tag])
      }
    } else{
      if(!categoryResult.map(([tag]) => '#' + tag).includes(tag)){ 
        let cat = _findActiveCat()
        fetch(`/api/tags/${tag.slice(1)}/${cat}`, {method: 'POST'})
          .then(response => response.json())
          .then(data => setCategoryResult(data))
      }
    }
  }

  const deselectTag = (tag) => {
    if(!inEditMode){
      setSelectedTags(selectedTags.filter(item => item !== tag))
    } else{
      if(categoryResult.map(([tag]) => '#' + tag).includes(tag)){ 
        let cat = _findActiveCat()
        fetch(`/api/tags/${tag.slice(1)}/${cat}`, {method: 'DELETE'})
          .then(response => response.json())
          .then(data => setCategoryResult(data))
      }
    }
  }

  return(
    <div id="app">
      <div className="column left">
        <Searchbox setSearchResult={setSearchResult} categoryResult={categoryResult.map(([tag]) => tag)} inEditMode={inEditMode} />
        <Categories 
          setCategoryResult={setCategoryResult} 
          setSearchResult={setSearchResult}
          inEditMode={inEditMode} 
          setInEditMode={setInEditMode}
        />
        <Save selectedTags={selectedTags} />
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
          inEditMode={inEditMode}
        />
        <TagDisplay 
          label={inEditMode 
            ? `Edit Category: ${_findActiveCat()}` 
            : "Selected Tags:"} 
          tags={inEditMode ? categoryResult.map(([tag]) => '#' + tag) : selectedTags} 
          showChips={false}
          onSelect={(tag) => inEditMode ? selectTag(tag) : setSelectedTags(selectedTags.filter(item => item !== tag))}
          onDeselect={(tag) => inEditMode ? deselectTag(tag) : null} 
          inEditMode={inEditMode}
          hideBtn={inEditMode ? true : false}
        />
      </div>
    </div>
  )
}

export default App