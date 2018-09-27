const tesseract = require("tesseract")
const tess = new tesseract.BaseApi()
const pix

tess.init("eng")

function getText(img) {
  // set image
  tess.setImage(img)

  // run recognition
  tess.recognize()

  // get recognized text
  console.log()

  return new Promise((resolve, rejecect) => {
    const text = tess.getText()
    if (!text) reject()
    resolve(text)
  })

  tess.clear()
  tess.end()
}
