const axios = require('axios')
const fs = require('fs')

async function downloadImage(url) {
  console.log(url);
  // axios image download with response type "stream"
  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream'
  })

  // return a promise and resolve when download finishes
  return new Promise((resolve, reject) => {
    response.data.on('end', stream => {
      response.data.pipe(fs.createWriteStream('img'))
      resolve(response.data.pipe(fs.createWriteStream('img')))
    })

    response.data.on('error', e => {
      reject(e)
    })
  })

}

module.exports = downloadImage
