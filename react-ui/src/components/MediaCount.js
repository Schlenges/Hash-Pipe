import React from 'react'
import RadioButton from './RadioButton.js'

const MediaCount = ({maxCount, setMaxCount}) => {
  let values = [["< 1k", 1000], ["< 10k", 10000], ["< 100k", 100000], ["< 1M", 1000000]]

  return (
    <div className="media-count">
      <div className="label">Filter by media count</div>
        <div className="options">
        {values.map(([text, value]) => 
          <RadioButton key={text} text={text} handleClick={() => setMaxCount(value)} isSelected={value === maxCount} />
        )}
        <RadioButton key={"all"} text={"all"} handleClick={() => setMaxCount(null)} isSelected={null === maxCount} />
      </div>
    </div>
  )
}

export default MediaCount