var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

/* GET home page. */
router.post('/insertframe', upload.single("picture"), function (req, res, next) {
    console.log("BODY:", req.body)
    console.log("FILE:", req.file)
    pool.query('insert into frame (framename,status, picture) values(?,?,?)', [req.body.framename,req.body.status, req.body.myfilename], function (error, result) {
      if (error) {
        res.status(500).json(false)
      }
      else {
        res.status(200).json(true)
      }
    })
});




router.post('/editframepicture', upload.single("picture"), function (req, res, next) {
    console.log("BODY:", req.body)
    console.log("FILE:", req.file)
    pool.query('update frame  set picture=? where frameid=? ', [ req.body.myfilename,req.body.frameid], function (error, result) {
      if (error) {
        res.status(500).json(false)
      }
      else {
        res.status(200).json(true)
      }
    })
  
  });

  router.post('/updateframedata', function (req, res, next) {
    console.log("BODY:", req.body)
    pool.query('update frame set framename=?,status=? where frameid=?', [req.body.framename,req.body.status, req.body.frameid], function (error, result) {
      if (error) {
        res.status(500).json(false)
      }
      else {
        res.status(200).json(true)
      }
    })
  
  });

  router.get('/fetchallframe', function (req, res, next) {
    pool.query('select * from frame', function (error, result) {
      if (error) {
        res.status(500).json([])
      }
      else {
        res.status(200).json({ data: result })
      }
    })

    

router.post('/deleteframe',  function (req, res, next) {
    console.log("BODY:", req.body)
    pool.query('delete from frame  where frameid=? ', [req.body.frameid], function (error, result) {
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
