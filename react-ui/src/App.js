import React, { useState, useEffect } from 'react'
import TagDisplay from './components/TagDisplay.js'
import Searchbox from './components/SearchBox.js'
import Categories from './components/Categories.js'
import Save from './components/Save.js'
import MediaCount from './components/MediaCount.js'
import TagCount from './components/TagCount.js'
import './App.css'

const App = () => {
  const [searchResult, setSearchResult] = useState([])
  const [categoryResult, setCategoryResult] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [inEditMode, setInEditMode] = useState(false)
  const [mediaCount, setMediaCount] = useState(null)
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/')
      .then((response) => response.json())
      .then(data => {
        //setSelectedTags(data.map(([tag]) => '#' + tag))
        setSearchResult(data)
        setLoading(false)
      })

    return window.addEventListener("beforeunload", function(event) { 
      event.preventDefault()
      fetch('/api/stop')
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
        <Searchbox setSearchResult={setSearchResult} categoryResult={categoryResult.map(([tag]) => tag)} inEditMode={inEditMode} loading={loading}/>
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
          mediaCount={mediaCount}
          amount={amount}
          loading={loading}
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
          amount={0}
        />
      </div>
      <div className="column right">
        <MediaCount setMaxCount={setMediaCount} maxCount={mediaCount} />
        <TagCount setAmount={setAmount} />
      </div>
    </div>
  )
}

export default App