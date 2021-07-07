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

app.get('/api/search/tags', async (req, res) => {
  let term = req.query.q
  if(req.query.cats){ 
    let cats = req.query.cats.split(',')
    res.json(tags.findInCategories(term, cats))
  } else {
    res.json(tags.find(term))
  }
})

app.get('/api/search/:categories', async (req, res) => {
  let categories = req.params.categories.split('&')
  let data = categories.map((category) => {
    let id = catDir.getId(category)
    return tags.getAllByCategory(id)
  })
  
  let obj = Object.fromEntries([].concat(...data))
  res.json([Object.entries(obj)])
})

app.get('/api/categories', (req, res) => {
  let categories = catDir.getAllArray()
  res.json(categories)
})

app.listen(5000, () => 
  console.log(`Server running on port 5000`)
)