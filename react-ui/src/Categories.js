import React, { useState } from 'react'

const Categories = ({tags, setTags}) => {
  //GET categories
  const [activeCategories, setActiveCategories] = useState([])
  const [categories] = useState(["Design", "Logo", "Business", "Denver", "Brandidentity"])

  const handleClick = async (event, category) => { 
    let isActive = activeCategories.includes(category)
    let val //= isActive ? activeCategories.filter(cat => cat !== category) : [...activeCategories, category]

    if(isActive){ 
      val = activeCategories.filter(cat => cat !== category)
      /* let filtered =  */tags.filter(([key, val]) => val.categories.includes(category))
      /* console.log(filtered)
      setTags(filtered) */
    } else {
      val = [...activeCategories, category]
    }

    setActiveCategories(val)

    fetch(`/api/${val.map(cat => cat.toLowerCase()).join('&')}`)
      .then(response => response.json())
      .then(data => {
        setTags([].concat(...data))
      })

    isActive ? event.target.classList.remove('active') : event.target.classList.add('active')
  }

  return(
    <div id="categories">
      <div className="label">Categories</div>
      <div className="chip-set">
       {categories.map(category => <div key={category} onClick={(event) => handleClick(event, category)} className="chip">{category}</div>)}
      </div>
    </div>
  )
}

export default Categories