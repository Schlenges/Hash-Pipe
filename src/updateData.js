const fetch = require('node-fetch')
const { cookie, userAgent } = require('../config.js')

module.exports = updateData = async (tags) => {
  let myHeaders = new fetch.Headers()
  myHeaders.append("Host", " www.instagram.com")
  myHeaders.append("User-Agent", userAgent)
  myHeaders.append("Accept", " text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
  myHeaders.append("Accept-Language", " en-GB,en;q=0.5")
  myHeaders.append("Alt-Used", " www.instagram.com")
  myHeaders.append("Connection", " keep-alive")
  myHeaders.append("Cookie", cookie)
  myHeaders.append("Upgrade-Insecure-Requests", " 1")

  let options = {
    method: 'GET',
    headers: myHeaders
  }

  let data = []

  for(let tag of tags) {
    let url = `https://www.instagram.com/explore/tags/${tag}/?__a=1`

    data.push(fetch(url, options)
      .then(response => response.json())
      .then(result => {
        if(Object.keys(result).length != 0){
          return {
            [tag]:{ media_count: result.data.media_count }
          }
        }
      })
      .catch(error => console.log('error', error)))
  }

  return await Promise.all(data)
}