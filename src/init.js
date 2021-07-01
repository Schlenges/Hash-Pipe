const fs = require('fs')
const handleHashtags = require('./handleHashtags.js')
const { tagData, categoryData } = require('../data.js')
const Directory = require('./Directory.js')
const updateData = require('./updateData.js')

const writeData = (newData) => {
  let data = `module.exports = { tagData: ${JSON.stringify(newData)}, categoryData:${JSON.stringify(categoryData)} }`
  fs.writeFile(`${__dirname}/../data.js`, data, (err) => { if(err) console.log(err) })
}

const _addCategoriesField = (obj) => obj[Object.keys(obj)[0]].categories = []

const addTagData = (data, dir) => data.map(obj => {
  _addCategoriesField(obj)
  dir.add(obj)
  return obj
}) 

module.exports = init = async (hashtagFile) => {
  let tags = handleHashtags(hashtagFile)
  let tagDir = new Directory(tagData)
  let categoryDir = new Directory(categoryData)

  let removedTags = Object.keys(tagDir.getAll()).filter(tag => !tags.includes(tag))
  let newTags = tags.filter((tag) => !tagDir.getAll().hasOwnProperty(tag))
  
  if(newTags.length > 0){
    // if no session, login and get/write session cookie
    let newData = await updateData(newTags)
    newData = newData.filter(item => item !== undefined)
    addTagData(newData, tagDir)
  }

  if(removedTags.length > 0){
    removedTags.forEach(tag => tagDir.removeById(tag))
  }

  writeData(tagDir.getAll())

  return [tagDir, categoryDir, newTags]
}