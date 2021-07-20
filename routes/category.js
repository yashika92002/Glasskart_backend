var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

/* GET home page. */
router.post('/insertcategory', upload.single("picture"), function (req, res, next) {
    console.log("BODY:", req.body)
    console.log("FILE:", req.file)
    pool.query('insert into categories (categoryname, picture) values(?,?)', [req.body.categoryname, req.body.myfilename], function (error, result) {
      if (error) {
        res.status(500).json(false)
      }
      else {
        res.status(200).json(true)
      }
    })
});




router.post('/editcategorypicture', upload.single("picture"), function (req, res, next) {
    console.log("BODY:", req.body)
    console.log("FILE:", req.file)
    pool.query('update categories  set picture=? where categoryid=? ', [ req.body.myfilename,req.body.categoryid], function (error, result) {
      if (error) {
        res.status(500).json(false)
      }
      else {
        res.status(200).json(true)
      }
    })
  
  });

  router.post('/updatecategorydata', function (req, res, next) {
    console.log("BODY:", req.body)
    pool.query('update categories set categoryname=? where categoryid=?', [req.body.categoryname, req.body.categoryid], function (error, result) {
      if (error) {
        res.status(500).json(false)
      }
      else {
        res.status(200).json(true)
      }
    })
  
  });

  router.get('/fetchallcategories', function (req, res, next) {
    pool.query('select * from categories', function (error, result) {
      if (error) {
        res.status(500).json([])
      }
      else {
        res.status(200).json({ data: result })
      }
    })

    

router.post('/deletecategory',  function (req, res, next) {
    console.log("BODY:", req.body)
    pool.query('delete from categories  where categoryid=? ', [req.body.categoryid], function (error, result) {
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
