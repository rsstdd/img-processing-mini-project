class Tess {
  constructor(tesseract) {
    this.tesseract = tesseract;
    this.tess = new tesseract.BaseApi();
    this.tess.init("eng");
  }

  getText(img) {
    tess.setImage(img);
    tess.recognize();
    return new Promise((resolve, rejecect) => {
      try {
        resolve(tess.getText());
      } catch (e) {
        reject(e);
      }
    });

    tess.clear().end();
  }
}

module.exports = Tess;
