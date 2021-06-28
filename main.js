const init = require('./init.js')

const run = async (tagFile) => {
  let [tagDir, categoryDir, newTags] = await init(tagFile)

  const getTagsByCategory = (category) => tagDir.getAllArray().filter(([id, val]) => val.categories.includes(categoryDir.getId(category)))
  const find = (term, tags) => tags.filter(([id, val]) => id.includes(term))
  const addCategory = (category) => categoryDir.add(category) // write to data-file
  const addTagToCategory = (tag, category) => tagDir.getById(tag).categories.push(categoryDir.getId(category)) // write to data-file
  const removeTagFromCategory = (tag, category) => {
    let categories = tagDir.getById(tag).categories
    categories = categories.filter(cat => !category)
  }
  const findInCategories = (term, categories) => {
    let tags = [].concat(...categories.map(category => getTagsByCategory(category)))
    return find(term, tags)
  }

}

run('./testTags.txt')