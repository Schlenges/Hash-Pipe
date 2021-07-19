const fs = require('fs')
const { getTags } = require('./handleHashtags.js')
const { tagData, categoryData } = require('../data.js')
const Directory = require('./Directory.js')
const updateData = require('./updateData.js')

const writeData = (newData) => {
  let data = `module.exports = { tagData: ${JSON.stringify(newData)}, categoryData:${JSON.stringify(categoryData)} }`
  fs.writeFile(`${__dirname}/../data.js`, data, (err) => { if(err) console.log(err) })
}

const addTagData = (data, dir) => data.map(obj => {
  dir.add(obj)
  return obj
}) 

module.exports = init = async (hashtagFile) => {
  let tags = getTags(hashtagFile)
  let tagDir = new Directory(tagData)
  let categoryDir = new Directory(categoryData)

  let removedTags = Object.keys(tagDir.getAll()).filter(tag => !tags.includes(tag))
  let newTags = tags.filter((tag) => !tagDir.getAll().hasOwnProperty(tag))
  
  if(newTags.length > 0){
    // if no session, login and get/write session cookie
    let newData = await updateData(newTags)
    newData = newData.filter(item => item !== undefined)
    newTags = newData //.map((item) => Object.keys(item)[0])
    addTagData(newData, tagDir)
  }

  if(removedTags.length > 0){
    removedTags.forEach(tag => tagDir.removeById(tag))
  }

  let updatedTags = tagDir.getAllArray().map(([tag]) => '#' + tag)
  fs.writeFile(hashtagFile, updatedTags.join('\n'), (err) => { if(err) console.log(err) })
  writeData(tagDir.getAll())

  return [tagDir, categoryDir, newTags]
}