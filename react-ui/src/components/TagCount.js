import React, { useState } from 'react'
import RadioButton from './RadioButton.js'

const TagCount = ({setAmount}) => {
  const [selected, setSelected] = useState(0)

  const Input = () => <input type="number" id="count" min="1" max="30"></input>

  const handleClick = () => {
    let val = selected > 0 ? Number(document.getElementById('count').value) : 0
    setAmount(val)   
  }

  return (
    <div className="tag-count">
      <div className="label">Show tags</div>
      <div className="options">
        <RadioButton text={"all"} handleClick={() => {setSelected(0)}} isSelected={selected === 0}/>
        <RadioButton 
          text={Input()} 
          handleClick={() => setSelected(1)} 
          isSelected={selected > 0}
        />
        <button onClick={handleClick}>Generate</button>
      </div>
    </div>
  )
}

export default TagCount