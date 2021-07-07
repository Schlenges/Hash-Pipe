/* eslint-disable */
import React, { useState, useEffect } from 'react'

const Searchbox = ({setSearchResult, categoryResult}) => {
  const [term, setTerm] = useState('')

  useEffect(() => {
    if(term.length > 0){
      fetch(`/api/search?q=${term}`)
      .then(res => res.json())
      .then(data => {
        let result = categoryResult.length > 0 ? data.filter(([tag]) => categoryResult.includes(tag)) : data
        setSearchResult(result.map(([tag]) => "#" + tag))
      })
    }
  }, [term])

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