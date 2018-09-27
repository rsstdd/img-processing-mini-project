const fs = require('fs')
const path = require('path');
const express = require('express')
const router = express.Router()

const getImage = require('../src/get-image');

router.post('/api/get-text', (req, res, next) => {
    if (!req.body) { return res.sendStatus(406) }
    const imgUrl = req.body.url
    // const buffer = req.file.buffer
    // const mimetype = req.file.mimetype
    // const originalname = req.file.originalname
    // const standardized = `${slugify(originalname).toLowerCase()}`
    // const url = `${s3Config.BASE_URL}${s3Config.BUCKET_NAME}/${standardized}`
    //
    // const isMimetype = /jpeg/.test(mimetype)
    //
    // if (!isMimetype){
    //   return res.sendStatus(406)
    // }
    //
    getImage(imgUrl)
      .then(d => console.log(d, 'asdf'))
    //   .then(data => uploadFile(data, mimetype, standardized))
      // .then(() => res.send(JSON.stringify(url)))
      .catch(err => {
        console.error(err);
        res.send(err)
      })
})

module.exports = router
