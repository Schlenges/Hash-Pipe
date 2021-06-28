const fs = require('fs')
const handleHashtags = require('./handleHashtags.js')
const { tagData, categoryData } = require('./data.js')
const Directory = require('./Directory.js')
const updateData = require('./updateData.js')

const writeData = (newData) => {
  updatedTagData = Object.assign(tagData, ...newData)

  let data = `module.exports = { tagData: ${JSON.stringify(updatedTagData)}, categoryData:${JSON.stringify(categoryData)} }`
  fs.writeFile('./data.js', data, (err) => { if(err) console.log(err) })
}

const _addCategoryField = (obj) => obj[Object.keys(obj)[0]].category = []

const addTagData = (data, dir) => data.map(obj => {
  _addCategoryField(obj)
  dir.add(obj)
  return obj
}) 

module.exports = init = async (hashtagFile) => {
  let tags = handleHashtags(hashtagFile)
  let tagDir = new Directory(tagData)
  let categoryDir = new Directory(categoryData)

  let newTags = tags.filter((tag) => !tagDir.getAll().hasOwnProperty(tag))
  
  if(newTags.length > 0){
    // if no session, login and get/write session cookie
    let newData = await updateData(newTags)
    newData = addTagData(newData, tagDir)
    writeData(newData)
  }

  return [tagDir, categoryDir, newTags]
}