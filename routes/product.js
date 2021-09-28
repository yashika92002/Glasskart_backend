var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

/* GET home page. */
router.post('/insertproduct', upload.single("picture"), function (req, res, next) {
  console.log("BODY:", req.body)
  console.log("FILE:", req.file)
  pool.query('insert into product ( productname, categoryid, type, frameid, materialid, shapeid, description,status,addstatus, picture) values(?,?,?,?,?,?,?,?,?,?)', [req.body.productname, req.body.category, req.body.type, req.body.frame, req.body.material, req.body.shape, req.body.description,req.body.status,req.body.addstatus,req.body.myfilename], function (error, result) {
      console.log(error)
    if (error) {
      res.status(500).json(false)
    }
    else {
      res.status(200).json(true)
    }
  })

});


router.post('/fetchallproductsbygender', function (req, res, next) {
  pool.query('select p.*,(select categoryname from categories where categoryid=p.categoryid)as categoryname,(select materialname from material where materialid = p.materialid)as materialname,(select shapename from shape where shapeid=p.shapeid)as shapename,(select framename from frame where frameid=p.frameid)as framename from product p where p.categoryid=? and p.type=?',[req.body.categoryid,req.body.gender], function (error, result) {
    if (error) {
      res.status(500).json([])
    }
    else {
      res.status(200).json({ data: result })
    }
  })

});

router.get('/fetchallproducts', function (req, res, next) {
    pool.query('select p.*,(select categoryname from categories where categoryid=p.categoryid)as categoryname,(select materialname from material where materialid = p.materialid)as materialname,(select shapename from shape where shapeid=p.shapeid)as shapename,(select framename from frame where frameid=p.frameid)as framename from product p', function (error, result) {
      if (error) {
        res.status(500).json([])
      }
      else {
        res.status(200).json({ data: result })
      }
    })
  
  });

  router.post('/fetchourrecommendation', function (req, res, next) {
    pool.query('select * from product where status= ?',[req.body.status], function (error, result) {
      if (error) {
        res.status(500).json([])
      }
      else {
        res.status(200).json({ data: result })
      }
    })
  
  });

  router.post('/editproductpicture', upload.single("picture"), function (req, res, next) {
    console.log("BODY:", req.body)
    console.log("FILE:", req.file)
    pool.query('update product  set picture=? where productid=? ', [ req.body.myfilename,req.body.productid], function (error, result) {
      if (error) {
        res.status(500).json(false)
      }
      else {
        res.status(200).json(true)
      }
    })
  
  });

  router.post('/updateproductdata', function (req, res, next) {
    console.log("BODY:", req.body)
    pool.query('update product set  productname=? , categoryid=?, type=?, frameid=?, materialid=?, shapeid=?, description=?,status=?,addstatus=? where productid=?', [req.body.productname, req.body.category, req.body.type, req.body.frame, req.body.material, req.body.shape, req.body.description,req.body.status,req.body.addstatus, req.body.productid], function (error, result) {
      if (error) {
        res.status(500).json(false)
      }
      else {
        res.status(200).json(true)
      }
    })
  
  });

  router.post('/deleteproduct',  function (req, res, next) {
    console.log("BODY:", req.body)
    pool.query('delete from product  where productid=? ', [req.body.productid], function (error, result) {
      if (error) {
        res.status(500).json(false)
      }
      else {
        res.status(200).json(true)
      }
    })
  
  });


module.exports = router;
