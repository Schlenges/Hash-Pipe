import React, { useState, useEffect } from 'react'

const Searchbox = ({setSearchResult, categoryResult, inEditMode}) => {
  const [term, setTerm] = useState('')

  useEffect(() => {
      fetch(`/api/search/tags?q=${term}`)
      .then(res => res.json())
      .then(data => {
        if(!inEditMode){ 
          let result = categoryResult.length > 0 ? data.filter(([tag]) => categoryResult.includes(tag)) : data
          setSearchResult(result)
        } else{
          setSearchResult(data)
        }
      })
      
  }, [term]) // eslint-disable-line

  const handleSearch = (event) => { 
    setTerm(event.target.value)
  }
  
  return(
    <div id="searchbox">
      <label>Find hashtags</label>
      <input id="search-input" type="text" value={term} onChange={handleSearch}/>
    </div>
  )
}

export default Searchbox