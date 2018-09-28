const axios = require("axios");
const fs = require("fs");

async function downloadImage(url) {
  return new Promise((res, rej) => {
    axios({
      method: "GET",
      url: url,
      responseType: "arraybuffer"
    })
      .then(resp => res(resp.data))
      .catch(err => rej(err));
  });
}

module.exports = downloadImage;
