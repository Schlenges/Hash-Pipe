const fs = require('fs')
const puppeteer = require('puppeteer')

const saveCookies = async (page) => { 
  const cookiesFilePath = 'cookies.json'
  const cookiesObject = await page.cookies()

  fs.writeFile(cookiesFilePath, JSON.stringify(cookiesObject), (err) => err 
    ? console.log('The file could not be written.', err)
    : console.log('Session has been successfully saved'))
}

const loadCookies = async () => {
  const previousSession = fs.existsSync('./cookies.json')
  
  if (previousSession) {
    const cookiesString = fs.readFileSync('./cookies.json')
    const parsedCookies = JSON.parse(cookiesString)

    if (parsedCookies.length == 0) {
      console.log('No cookies have been found')
    }

    return parsedCookies
  }
}

const setCookies = async (page) => {
  const cookies = await loadCookies()
  for(let cookie of cookies) {
    await page.setCookie(cookie)
  }
}

const login = async (page, username, password) => { 
  await page.waitForSelector('button.aOOlW.bIiDR')
  await page.click('button.aOOlW.bIiDR')
  await _delay(2000)
  await page.waitForSelector('input[name="username"]')
  await page.type('input[name="username"]', username)
  await page.type('input[name="password"]', password)
  await page.click('button[type="submit"]')
  await _delay(3000)
}

const _delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))

module.exports = updateData = async (tags) => { 
  const browser = await puppeteer.launch(/* { headless: false } */)

  console.log('Fetching data...')

  let data = tags.map(async (tag) => { 
    try{
      const page = await browser.newPage()
      await setCookies(page)
      await page.goto(`https://www.instagram.com/explore/tags/${tag.slice(1)}`)
      await page.waitForSelector('span.g47SY')
      const count = await page.$eval('span.g47SY', (element) => element.innerHTML )
      page.close()

      return {
        [tag]: {media_count: count}
      }
    } catch (err) { console.log(err) }
  })
    
  console.log(await Promise.all(data))
}