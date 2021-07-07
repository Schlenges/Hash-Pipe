import React, { useState, useEffect } from 'react'
import Chip from './Chip.js'

const Categories = ({setCategoryResult, setSearchResult}) => {
  const [categories] = useState(["Design", "Logo", "Business", "Denver", "Brandidentity"])
  const [activeCats, setActiveCats] = useState([])

  const onSelect = (category) => {
    setActiveCats([...activeCats, category])
  }

  const onDeselect = (category) => {
    setActiveCats(activeCats.filter(cat => cat !== category))
  }

  useEffect(() => {
    if(activeCats.length > 0){
      fetch(`/api/${activeCats.map(cat => cat.toLowerCase()).join('&')}`)
      .then(response => response.json())
      .then(data => {
        setCategoryResult([].concat(...data))
      })
    } else{
      fetch(`/api/search?q=${document.getElementById("search-input").value}`)
      .then(response => response.json())
      .then(data => {
        setCategoryResult([])
        setSearchResult(data.map(([tag]) => "#" + tag))
      })
    }
  }, [activeCats, setCategoryResult, setSearchResult])

  return(
    <div id="categories">
      <div className="label">Categories</div>
      <div className="chip-set">
        {categories.map(category => 
          <Chip 
            key={category} 
            text={category}
            isSelected={activeCats.includes(category)}
            onSelect={onSelect}
            onDeselect={onDeselect}
          />
        )}
      </div>
    </div>
  )
}

export default Categories