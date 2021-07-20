var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

/* GET home page. */
router.post('/insertshape', upload.single("picture"), function (req, res, next) {
    console.log("BODY:", req.body)
    console.log("FILE:", req.file)
    pool.query('insert into shape (shapename, status,picture) values(?,?,?)', [req.body.shapename,req.body.status, req.body.myfilename], function (error, result) {
      if (error) {
        res.status(500).json(false)
      }
      else {
        res.status(200).json(true)
      }
    })
});




router.post('/editshapepicture', upload.single("picture"), function (req, res, next) {
    console.log("BODY:", req.body)
    console.log("FILE:", req.file)
    pool.query('update shape  set picture=? where shapeid=? ', [ req.body.myfilename,req.body.shapeid], function (error, result) {
      if (error) {
        res.status(500).json(false)
      }
      else {
        res.status(200).json(true)
      }
    })
  
  });

  router.post('/updateshapedata', function (req, res, next) {
    console.log("BODY:", req.body)
    pool.query('update shape set shapename=? ,status=? where shapeid=?', [req.body.shapename,req.body.status, req.body.shapeid], function (error, result) {
      if (error) {
        res.status(500).json(false)
      }
      else {
        res.status(200).json(true)
      }
    })
  
  });

  router.get('/fetchallshape', function (req, res, next) {
    pool.query('select * from shape', function (error, result) {
      if (error) {
        res.status(500).json([])
      }
      else {
        res.status(200).json({ data: result })
      }
    })

    

router.post('/deleteshape',  function (req, res, next) {
    console.log("BODY:", req.body)
    pool.query('delete from shape  where shapeid=? ', [req.body.shapeid], function (error, result) {
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
