import React, { useState, useEffect }from 'react'
import './App.css'
import SearchBox from './SearchBox.js'
import Categories from './Categories.js'
import TagDisplay from './TagDisplay.js'

//const testdata = ["#design", "#designer", "#branddesign"]

const App = () => {
  const [tags, setTags] = useState([])
  // Find by categories
  //const [activeCategories, setActiveCategories] = useState([])
  const [areNew, setAreNew] = useState(false)

  // useEffect once tags = init value
  useEffect(() => { 
    fetch(`/api`)
      .then(response => response.json())
      .then(data => {
        setAreNew(data.length > 0)
        setTags(data.map(entry => [entry, {}]))
      })
  }, [])

  useEffect(() => {
    console.log(tags)
  }, [tags])

  //search
    // if(activeCategories.length > 0) findInCategories
    // else find

  return (
    <div  id="app">
      <div className="column">
        <SearchBox />
        <Categories tags={tags} setTags={setTags}/>
        <button id="save-button">Save tags</button>
      </div>
      <TagDisplay tags={tags} setTags={setTags} areNew={areNew} />
    </div>
  )
}

export default App