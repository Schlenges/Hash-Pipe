const fs = require('fs')

module.exports = dirHelper = (tagDir, catDir) => ({
  writeData: () => {
    let data = `module.exports = { tagData: ${JSON.stringify(tagDir.getAll())}, categoryData:${JSON.stringify(catDir.getAll())} }`
    fs.writeFile(`${__dirname}/../../data.js`, data, (err) => { if(err) console.log(err) })
  },

  addCategory: (category) => {
    catDir.add(category)
    this.writeData
  },

  removeCategory: (category) => {
    let catId = catDir.getId(category)
    getTagsByCategory(category).forEach(([tag]) => removeTagFromCategory(tag, catId))
    catDir.removeById(catId)
    this.writeData
  },

  addTagToCategory: (tag, category) => {
    tagDir.getById(tag).categories.push(catDir.getId(category))
    this.writeData
  },
  
  removeTagFromCategory: (tag, categoryId) => {
    let categories = tagDir.getById(tag).categories
    tagDir.getById(tag).categories = categories.filter(cat => cat != categoryId)
    this.writeData
  },
  
  removeTag: (tag) => {
    tagDir.removeById(tag)
    let hashtags = Object.keys(tagDir.getAll()).map(key => '#' + key).join('\n')
    console.log(hashtags)
    fs.writeFile(`${__dirname}/../../hashtags.txt`, hashtags, (err) => { if(err) console.log(err) })
    this.writeData
  }
})
