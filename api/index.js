var express = require('express')
var app = express()
var runApp = require('../main.js')

const { tagData, categoryData } = require('../data.js')
const Directory = require('../src/Directory.js')
const tagsHelper = require('../src/helpers/tags.js')
const dirHelper = require('../src/helpers/dirs.js')

let tagDir = new Directory(tagData)
let catDir = new Directory(categoryData)
const tags = tagsHelper(tagDir)
const dir = dirHelper(tagDir, catDir)

app.get('/api/', async (req, res) => {
  let newTags = await runApp('hashtags.txt')
  res.json(newTags)
})

app.get('/api/search', async (req, res) => {
  res.json(tags.find(req.query.q))
})

app.get('/api/:categories', async (req, res) => {
  let categories = req.params.categories.split('&')
  let data = categories.map((category) => {
    let id = catDir.getId(category)
    return tags.getAllByCategory(id)
  })
  
  let obj = Object.fromEntries([].concat(...data))
  res.json([Object.entries(obj)])
})

app.listen(5000, () => 
  console.log(`Server running on port 5000`)
)