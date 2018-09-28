const tesseract = require("tesseractocr");

const getText = img => {
  console.log(img);
  return new Promise((res, rej) => {
    tesseract(Buffer.from(img), (err, text) => {
      if (err) {
        console.log(err);
        rej(err);
      }

      console.log(err, text);
      res(text);
    });
  });
};

module.exports = getText;
