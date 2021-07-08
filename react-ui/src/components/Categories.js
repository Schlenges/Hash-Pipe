import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Chip from './Chip.js'

const Categories = ({setCategoryResult, setSearchResult}) => {
  const [categories, setCategories] = useState([])
  const [activeCats, setActiveCats] = useState([])
  const [showInput, setShowInput] = useState(false)

  const onSelect = (category) => {
    setActiveCats([...activeCats, category])
  }

  const onDeselect = (category) => {
    setActiveCats(activeCats.filter(cat => cat !== category))
  }

  const openInput = () => {
    let classes = document.getElementById('add-cat-icon').classList
    classes.contains('active') ? classes.remove('active') : classes.add('active')
    showInput ? setShowInput(false) : setShowInput(true)
  }

  const addCategory = () => {
    let cat = document.getElementById('category-input').value
    if(cat.length > 0){
      fetch(`/api/categories/${cat}`, {method: 'POST'})
        .then((response) => response.json())
        .then(data => {
          setCategories(data)
          setShowInput(false)
        })
        document.getElementById('add-cat-icon').classList.remove('active')
    }
  }

  useEffect(() => {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(data)
      })
  }, [])

  useEffect(() => {
    if(activeCats.length > 0){
      fetch(`/api/search/${activeCats.map(cat => cat.toLowerCase()).join('&')}`)
      .then(response => response.json())
      .then(data => {
        [].concat(...data).length <= 0
          ? setCategoryResult(['empty'])
          : setCategoryResult([].concat(...data))
      })
    } else{
      fetch(`/api/search/tags?q=${document.getElementById("search-input").value}`)
      .then(response => response.json())
      .then(data => {
        setCategoryResult([])
        setSearchResult(data.map(([tag]) => "#" + tag))
      })
    }
  }, [activeCats, setCategoryResult, setSearchResult])

  return(
    <div id="categories">
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <div className="label">Categories</div>
        <FontAwesomeIcon id="add-cat-icon" className="plus-icon" icon={faPlus} onClick={openInput}/>
      </div>
      <div className="chip-set">
        {categories.map(([id, category]) => 
          <Chip 
            key={category} 
            text={category}
            isSelected={activeCats.includes(category)}
            onSelect={onSelect}
            onDeselect={onDeselect}
          />
        )}
      </div>
      {showInput 
        ? <div>
            <input id="category-input" />
            <button className="btn" onClick={addCategory}>Add</button>
          </div>
        : null
      }
    </div>
  )
}

export default Categories