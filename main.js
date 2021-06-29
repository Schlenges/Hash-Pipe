const init = require('./src/init.js')
const tagsHelper = require('./src/helpers/tags.js')
const dirHelper = require('./src/helpers/dirs.js')

const run = async (tagFile) => {
  const [tagDir, catDir, newTags] = await init(tagFile)
  const tags = tagsHelper(tagDir)
  const dir = dirHelper(tagDir, catDir)

  dir.removeTag('designcoach')
}

run('hashtags.txt')