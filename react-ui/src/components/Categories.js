import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
import Chip from './Chip.js'

const Categories = ({setCategoryResult, setSearchResult, inEditMode, setInEditMode}) => {
  const [categories, setCategories] = useState([])
  const [activeCats, setActiveCats] = useState([])
  const [showInput, setShowInput] = useState(false)

  const onSelect = (category) => {
    inEditMode ? setActiveCats([category]) : setActiveCats([...activeCats, category])
  }

  const onDeselect = (category) => {
    setActiveCats(activeCats.filter(cat => cat !== category))
  }

  const openInput = () => {
    setInEditMode(false)
    let classes = document.getElementById('add-cat-icon').classList
    classes.contains('active') ? classes.remove('active') : classes.add('active')
    showInput ? setShowInput(false) : setShowInput(true)
  }

  const addCategory = () => {
    let cat = document.getElementById('category-input').value.toLowerCase()
    if(cat.length > 0){
      fetch(`/api/categories/${cat}`, {method: 'POST'})
        .then((response) => response.json())
        .then(data => {
          setCategories(data.filter(([id, category]) => category !== "all"))
          setShowInput(false)
        })
        document.getElementById('add-cat-icon').classList.remove('active')
    }
  }

  const editCategory = () => {
    let cat = activeCats.length > 0 ? activeCats[0] : categories[0][1]
    setActiveCats([cat])
    setInEditMode(!inEditMode)
  }

  const removeCat = (id, category) => {
    let remove = confirm(`Are you sure you want to delete the category "${category}"?`) // eslint-disable-line
    if(remove){
      fetch(`api/categories/${category}`, {method: 'DELETE'})
        .then((response) => response.json())
        .then(data => {
          setCategories(data.filter(([id, category]) => category !== "all"))
          setActiveCats([categories[0][1]])
        })
    }
  }

  useEffect(() => {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(data.filter(([id, category]) => category !== "all"))
      })
  }, [])

  useEffect(() => {
    if(activeCats.length > 0){
      fetch(`/api/search/${activeCats.map(cat => cat.toLowerCase()).join('&')}`)
      .then(response => response.json())
      .then(data => {
        [].concat(...data).length <= 0
          ? setCategoryResult([]) // 'empty'
          : setCategoryResult([].concat(...data))
      })
    } else{
      fetch(`/api/search/tags?q=${document.getElementById("search-input").value}`)
      .then(response => response.json())
      .then(data => {
        setCategoryResult([])
        setSearchResult(data)
      })
    }
  }, [activeCats, setCategoryResult, setSearchResult])

  return(
    <div id="categories">
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <div className="label">Categories</div>
        <FontAwesomeIcon id="add-cat-icon" className="icon" icon={faPlus} onClick={openInput}/>
        <FontAwesomeIcon id="edit-cat-icon" className={`icon ${inEditMode ? 'active' : ''}`} icon={faEdit} onClick={editCategory}/>
      </div>
      <div className="chip-set">
        {categories.map(([id, category]) => 
          <Chip 
            key={category} 
            text={category}
            isSelected={activeCats.includes(category)}
            onSelect={onSelect}
            onDeselect={onDeselect}
            icon={inEditMode}
            remove={() => removeCat(id, category)}
          />
        )}
      </div>
      {showInput 
        ? <div>
            <input type="text" id="category-input" />
            <button className="btn" onClick={addCategory}>Add</button>
          </div>
        : null
      }
    </div>
  )
}

export default Categories