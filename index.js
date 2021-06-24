const fs = require('fs')
const puppeteer = require('puppeteer')

// Session
const saveCookies = async (page) => { 
  const cookiesFilePath = 'cookies.json'
  const cookiesObject = await page.cookies()

  fs.writeFile(cookiesFilePath, JSON.stringify(cookiesObject), (err) => err 
    ? console.log('The file could not be written.', err)
    : console.log('Session has been successfully saved'))
}

const loadCookies = async (page) => {
  const previousSession = fs.existsSync('./cookies.json')
  if (previousSession) {
    const cookiesString = fs.readFileSync('./cookies.json')
    const parsedCookies = JSON.parse(cookiesString)

    if (parsedCookies.length !== 0) {
      for (let cookie of parsedCookies) {
        await page.setCookie(cookie)
      }
      console.log('Session has been loaded in the browser')
    } else {
      console.log('No cookies have been found')
    }
  }
}

const login = async (page, username, password) => { 
  await page.waitForSelector('button.aOOlW.bIiDR')
  await page.click('button.aOOlW.bIiDR')
  await delay(2000)
  await page.waitForSelector('input[name="username"]')
  await page.type('input[name="username"]', username)
  await page.type('input[name="password"]', password)
  await page.click('button[type="submit"]')
  await delay(3000)
}

const _format = (data) => data.replace(/\s+/g, '\n')
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

/* Format file containing all hashtags to a neat list */
const cleanFile = (file, data) => fs.writeFile(file, data, (err) => { if(err) console.log(err) })
/* Find all tags containing specified words */
const find = (hashtags, words) => hashtags.filter(tag => _included(words, tag))
/* Find all tags that don't contain' specified words */
const exclude = (hashtags, words) => hashtags.filter(tag => !_included(words, tag))
/* Save selected tags to a text file */
const saveToText = (filename, tags) => fs.writeFile(`./${filename}.txt`, tags.join('\n'), (err) => { if(err) console.log(err) })

/** ToDo
 * specify tag count (max 30)
 * randomize
 * add duplicate removal
 */

const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))

const saveToJSON = async (tags) => { 
  /* let json = tags.map(tag => ({[tag]: {media_count: 0}}))
  console.log(Object.assign({}, ...json)) */
}

const updateData = async (tags) => { 
  const browser = await puppeteer.launch(/* { headless: false } */)

  const page = await browser.newPage()
  // if no cookied file, login/save cookies
  loadCookies(page)
    
  let data = []

  for(let tag of tags) { 
    try{
      await page.goto(`https://www.instagram.com/explore/tags/${tag.slice(1)}`)
      await page.waitForSelector('span.g47SY')
      let count = await page.$eval('span.g47SY', (element) => element.innerHTML )
      data.push({
        [tag]: {media_count: count}
      })
    } catch (e) { console.log(e) }
  }

  console.log(data)
}

const run = () => {
  let data = _getData('./hashtags.txt')
  let hashtags = _getTags(data)

  let tags = find(hashtags, ['health'])

  updateData(tags)
}

run()