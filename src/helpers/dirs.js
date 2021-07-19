const fs = require('fs')

module.exports = dirHelper = (tagDir, catDir) => ({
  writeData: function(){
    let data = `module.exports = { tagData: ${JSON.stringify(tagDir.getAll())}, categoryData:${JSON.stringify(catDir.getAll())} }`
    fs.writeFile(`${__dirname}/../../data.js`, data, (err) => { if(err) console.log(err) })
  },

  addCategory: function(category){
    catDir.add(category)
    this.writeData()
  },

  removeCategory: function(category){
    let catId = catDir.getId(category)
    let tags = tagDir.getAllArray().filter(([id, val]) => val.categories.includes(catId))
    tags.forEach(([tag, info]) => {
      info.categories = info.categories.filter(cat => cat != catId)
    })
    
    catDir.removeById(catId)
    this.writeData()
  },

  addTagToCategory: function(tag, category){
    tagDir.getById(tag).categories.push(catDir.getId(category))
    this.writeData()
  },
  
  removeTagFromCategory: function(tag, categoryId){
    let categories = tagDir.getById(tag).categories
    tagDir.getById(tag).categories = categories.filter(cat => cat != categoryId)
    this.writeData()
  },
  
  removeTag: function(tag){
    tagDir.removeById(tag)
    let hashtags = Object.keys(tagDir.getAll()).map(key => '#' + key).join('\n')
    console.log(hashtags)
    fs.writeFile(`${__dirname}/../../hashtags.txt`, hashtags, (err) => { if(err) console.log(err) })
    this.writeData()
  },

  _save: function(path, tags){
    let hashtags = tags.map((tag) => '#' + tag).join('\n')
    fs.writeFile(path, hashtags, (err) => { if(err) console.log(err) })
  },
  
  saveTagsToFile: function(filename, tags, overwrite = false){
    if(!fs.existsSync(`${__dirname}/../../savedTags`)){
       fs.mkdirSync(`${__dirname}/../../savedTags`)
    }

    let path = `${__dirname}/../../savedTags/${filename}.txt`
  
    if(fs.existsSync(path)){
      console.log('File already exists')

      if(!overwrite){ 
        console.log('Canceled')
        return false
      }
    }
  
    this._save(path, tags)
    console.log('Saved')

    return true
  }
})
