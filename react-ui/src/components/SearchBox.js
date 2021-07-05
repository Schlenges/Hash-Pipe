import React, { useState } from 'react'

const Searchbox = () => {
  const [term, setTerm] = useState('')

  const handleSearch = (event) => { 
    /* if(activeCategories.length > 0){
      let cats = activeCategories.map(c => c.toLowerCase())
      fetch(`/api/search?q=${event.target.value}&cats=${cats.join(',')}`)
    }
    fetch(`/api/search?q=${event.target.value}`)
      .then(res => res.json())
      .then(data => setTags(data)) */

    setTerm(event.target.value)
  }
  
  return(
    <div id="searchbox">
      <label>Find hashtags</label>
      <input type="text" value={term} onChange={handleSearch}/>
    </div>
  )
}

export default Searchbox