const fs = require('fs')

const _extract = (tags) => tags.match(/#[^\s#]+/ig)
const _removeDuplicates = (tags) => [...new Set(tags)]

/**
 * Remove duplicate hashtags and format file 
*/
const cleanup = (tags, file) => {
  tags = _removeDuplicates(tags)
  fs.writeFile(file, tags.join('\n'), (err) => { if(err) console.log(err) })
  return tags.map(tag => tag.slice(1))
}

/**
 * Read hashtags from file
**/
const getTags = (file) => { 
  try {
    let data = fs.readFileSync(file, 'utf8')
    return _extract(data)
  } catch (err) {
    console.log(err.message)
  }
}

/**
 * Load and cleanup hashtags
**/
const handleHashtags = (file) => {
  let hashtags = getTags(file)
  return cleanup(hashtags, file)
}

module.exports = handleHashtags