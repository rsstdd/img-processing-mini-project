const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();


const getText = img => {
  return new Promise((res, rej) => {
    client
      .textDetection(img)
      .then(results => {
        if (results[0].error !== null && results[0].error.message) {
          rej(results[0].error.message)
        }

        if (results[0].fullTextAnnotation){
          res(results[0].fullTextAnnotation.text)
        }

      })
      .catch(err => {
        rej(err)
      });
  })
};

module.exports = getText;
