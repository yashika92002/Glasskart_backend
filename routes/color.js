var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

/* GET home page. */
router.post('/insertcolor', upload.single("picture"), function (req, res, next) {
    console.log("BODY:", req.body)
    console.log("FILE:", req.file)
    pool.query('insert into color (colorname,status, picture) values(?,?,?)', [req.body.colorname,req.body.status, req.body.myfilename], function (error, result) {
      if (error) {
        res.status(500).json(false)
      }
      else {    
        res.status(200).json(true)
      }
    })
});




router.post('/editcolorpicture', upload.single("picture"), function (req, res, next) {
    console.log("BODY:", req.body)
    console.log("FILE:", req.file)
    pool.query('update color  set picture=? where colorid=? ', [ req.body.myfilename,req.body.colorid], function (error, result) {
      if (error) {
        res.status(500).json(false)
      }
      else {
        res.status(200).json(true)
      }
    })
  
  });

  router.post('/updatecolordata', function (req, res, next) {
    console.log("BODY:", req.body)
    pool.query('update color set colorname=? ,status=? where colorid=?', [req.body.colorname, req.body.status,req.body.colorid], function (error, result) {
      if (error) {
        res.status(500).json(false)
      }
      else {
        res.status(200).json(true)
      }
    })
  
  });

  router.get('/fetchallcolor', function (req, res, next) {
    pool.query('select * from color', function (error, result) {
      if (error) {
        res.status(500).json([])
      }
      else {
        res.status(200).json({ data: result })
      }
    })

    

router.post('/deletecolor',  function (req, res, next) {
    console.log("BODY:", req.body)
    pool.query('delete from color  where colorid=? ', [req.body.colorid], function (error, result) {
      if (error) {
        res.status(500).json(false)
      }
      else {
        res.status(200).json(true)
      }
    })
  
  });
  
  });

module.exports = router;
