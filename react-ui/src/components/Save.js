import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const Save = ({selectedTags}) => {
  const [isSaved, setIsSaved] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  const openInput = () => {
    setShowInput(true)
  }

  const cancel = () => {
    if(!showWarning){
      document.getElementById('filename-input').value = ''
      setShowInput(false)
    }
    setShowWarning(false)
  }

  const saveTags = async () => {
    let filename = document.getElementById('filename-input').value

    let data = {
      filename: filename,
      tags: selectedTags.map(tag => tag.slice(1)),
      overwrite: showWarning ? true : false
    }

    if(!isSaved && filename.length > 0){
      let res = await fetch('/api/tags/save', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if(await res.json() === true){
        document.getElementById('filename-input').value = ''
        setShowWarning(false)
        setShowInput(false)
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 1000)
      } else {
        setShowWarning(true)
      }

    }
  }

  return (
    <div id="save-tags-container">
      <span id="save-tags" onClick={openInput}> 
      {isSaved
        ? <FontAwesomeIcon className="icon save-icon" icon={faCheckCircle}/>
        : <FontAwesomeIcon className="icon save-icon" icon={faDownload}/>
      }
      {isSaved
        ? "Saved"
        : "Save Tags"
      }
      </span>
      <div className="warning" style={{ visibility: showWarning ? "visible" : "hidden" }}>
        Warning: A file with that name already exists. <br/>
        Do you want to overwrite it?
      </div>
      <div id="save-file-input" style={{ visibility: showInput ? "visible" : "hidden" }}>
        <input id="filename-input" placeholder="Enter filename"/>
        <button id="save-btn" className="icon-btn" onClick={saveTags}>
          <FontAwesomeIcon className="icon" icon={faCheckCircle}/>
        </button>
        <button className="icon-btn" onClick={cancel}>
          <FontAwesomeIcon className="icon" icon={faTimesCircle}/>
        </button>
      </div>
    </div>
  )
}

export default Save