module.exports = tagsHelper = (tagDir) => ({
  find: (term, tags=tagDir.getAllArray()) => tags.filter(([id]) => id.includes(term)),

  getAllByCategory: (categoryId) => tagDir.getAllArray().filter(([id, val]) => val.categories.includes(categoryId)),

  findInCategories: (term, categories) => {
    let tags = [].concat(...categories.map(category => getTagsByCategory(category)))
    return find(term, tags)
  },

  findByMediaCount: (tags, count) => tags.filter(([id, val]) => val.media_count > count),

  getRandom: (tags) => tags[Math.floor(Math.random()*tags.length)],

  getAmount: (tags, count) => {
    let randomTags = []
  
    for(let i = 0; i < count; i++){
      let tag = getRandom(tags)
      randomTags.push(tag)
      tags = tags.filter(item => item != tag)
    }
  
    return randomTags
  }
})