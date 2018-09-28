const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

const getImage = require("../src/get-image");
const getText = require("../src/get-text");

router.post("/api/get-text", async (req, res, next) => {
  if (!req.body) {
    return res.sendStatus(406);
  }
  const imgUrl = req.body.url;

  getImage(imgUrl)
    .then(data => getText(data))
    .then(text => res.send(text))
    .catch(err => next(err));

  // getImage(imgUrl)
  //   .then(data => {
  //     console.log(data);
  //     // tesseract(data, (err, text) => {
  //     //   console.log(text);
  //     //   res.send(data);
  //     // });
  //   })
  //   // .then(data => res.send(data))
  //   .catch(err => {
  //     console.error(err);
  //     next(err);
  //   });
});

module.exports = router;
