const fs = require('fs')
const updateData = require('./updateData.js')

const _format = (data) => data.match(/#[^\s#]+/ig).join('\n')
const _getTags = (data) => data.split('\n')
const _included = (words, tag) => words.some(word => tag.includes(word))
const _getData = (file) => { 
  try {
    let data = fs.readFileSync(file, 'utf8')
    return data = _format(data)
  } catch (err) {
    console.log(err.message)
  }
}

/** ToDo
 * specify tag count (max 30)
 * randomize
 * add duplicate removal
*/

/* Format file containing all hashtags to a neat list */
const cleanFile = (file, data) => fs.writeFile(file, data, (err) => { if(err) console.log(err) })

const find = (hashtags, words) => hashtags.filter(tag => _included(words, tag))
const exclude = (hashtags, words) => hashtags.filter(tag => !_included(words, tag))
const saveToText = (filename, tags) => fs.writeFile(`./${filename}.txt`, tags.join('\n'), (err) => { if(err) console.log(err) })
const saveToJSON = async (tags) => { 
  /* let json = tags.map(tag => ({[tag]: {media_count: 0}}))
  console.log(Object.assign({}, ...json)) */
}

const run = () => {
  let data = _getData('./hashtags.txt')
  let hashtags = _getTags(data)

  let tags = find(hashtags, ['book'])

  updateData(tags)
}

run()