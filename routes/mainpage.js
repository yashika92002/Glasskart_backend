var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

/* GET home page. */
router.post('/insertmainpage', upload.single("picture"), function (req, res, next) {
    console.log("BODY:", req.body)
    console.log("FILE:", req.file)
    pool.query('insert into mainpage (position,status, picture) values(?,?,?)', [req.body.position,req.body.status, req.body.myfilename], function (error, result) {
      if (error) {
        res.status(500).json(false)
      }
      else {    
        res.status(200).json(true)
      }
    })
});




router.post('/editmainpagepicture', upload.single("picture"), function (req, res, next) {
    console.log("BODY:", req.body)
    console.log("FILE:", req.file)
    pool.query('update mainpage  set picture=? where mainpageid=? ', [ req.body.myfilename,req.body.mainpageid], function (error, result) {
      if (error) {
        res.status(500).json(false)
      }
      else {
        res.status(200).json(true)
      }
    })
  
  });

  router.post('/updatemainpagedata', function (req, res, next) {
    console.log("BODY:", req.body)
    pool.query('update mainpage set position=? ,status=? where mainpageid=?', [req.body.position, req.body.status,req.body.mainpageid], function (error, result) {
      if (error) {
        res.status(500).json(false)
      }
      else {
        res.status(200).json(true)
      }
    })
  
  });

  router.get('/fetchallmainpage', function (req, res, next) {
    pool.query('select * from mainpage', function (error, result) {
      if (error) {
        res.status(500).json([])
      }
      else {
        res.status(200).json({ data: result })
      }
    })

    

router.post('/deletemainpage',  function (req, res, next) {
    console.log("BODY:", req.body)
    pool.query('delete from mainpage  where mainpageid=? ', [req.body.mainpageid], function (error, result) {
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
