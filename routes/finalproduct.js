var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

/* GET home page. */
router.post('/insertfinalproduct', upload.single("picture"), function (req, res, next) {
  console.log("BODY:", req.body)
  console.log("FILE:", req.file)
  pool.query('insert into finalproduct (productid, colorid, size, price, offertype, offerprice, description, stock, picture) values(?,?,?,?,?,?,?,?,?)', [req.body.finalproductname,req.body.color, req.body.size, req.body.price, req.body.offertype, req.body.offerprice, req.body.description, req.body.stock,req.body.myfilename], function (error, result) {
      console.log(error)
    if (error) {
      res.status(500).json(false)
    }
    else {
      res.status(200).json(true)
    }
  })

});

router.get('/fetchallfinalproducts', function (req, res, next) {
  pool.query('select q.*,(select colorname from color where colorid=q.colorid)as colorname,(select productname from product where productid=q.productid)as productname from finalproduct q', function (error, result) {
    if (error) {
      res.status(500).json([])
    }
    else {
      res.status(200).json({ data: result })
    }
  })

});

router.post('/fetchallfinalproductsbyproductid', function (req, res, next) {
  pool.query('select q.*,(select colorname from color where colorid=q.colorid)as colorname,(select productname from product where productid=q.productid)as productname from finalproduct q  where productid=?', [req.body.productid],function (error, result) {
    if (error) {
      res.status(500).json({data:[]})
    }
    else {
      console.log(result)
      res.status(200).json({ data: result })
    }
  })

});


router.post('/fetchAllSize', function (req, res, next) {
  q='select fp.*,(select productname from product where productid=fp.productid)as productname,(select colorname from color where colorid=fp.colorid)as colorname from finalproduct fp where productid=?'
  pool.query( q,[req.body.productid],function (error, result) {
    if (error) {
      res.status(500).json([])
    }
    else {
      res.status(200).json({ data: result })
    }
  })

});

router.post('/addproductpictures',upload.any(), function (req, res, next){
console.log(req.body)
console.log(req.files)
var q= "insert into productpictures (finalproductid,image) values ?"
pool.query(q,[req.files.map((item)=>
  [req.body.finalproductid,item.filename]
)],function(error,result){
  console.log(error)
  if (error) {
    res.status(500).json({result: false})
  }
  else {
    res.status(200).json({result: true })
  }
})
})

router.post('/fetchAllSpecificPicture',function(req,res){
  pool.query('select * from productpictures where finalproductid=?',[req.body.finalproductid],function(error,result){
      if(error)
      {
        res.status(500).json([])
      }else
      {
        res.status(200).json({data:result})
      }
  })
})

router.post('/checkfinalproduct', function (req, res, next) {
  console.log(req.body)
  var q='select * from finalproduct where productid=? and colorid=? and size=?'
  pool.query( q,[req.body.productid,req.body.colorid,req.body.size],function (error, result) {
    console.log(error)
    if (error) {
      res.status(500).json([])
    }
    else {
      if(result.length==1)
      res.status(200).json({result:false })
      else
      res.status(200).json({result:true })
    }
  })

});

router.post('/fetchAllColor', function (req, res, next) {
  q='select fp.*,(select productname from product where productid=fp.productid)as productname,(select colorname from color where colorid=fp.colorid)as colorname from finalproduct fp where productid=? and size=?'
  pool.query( q,[req.body.productid,req.body.size],function (error, result) {
    if (error) {
      res.status(500).json([])
    }
    else {
      res.status(200).json({ data: result })
    }
  })

});

router.post('/editfinalproductpicture', upload.single("picture"), function (req, res, next) {
  console.log("BODY:", req.body)
  console.log("FILE:", req.file)
  pool.query('update finalproduct  set picture=? where finalproductid=? ', [ req.body.myfilename,req.body.finalproductid], function (error, result) {
    if (error) {
      res.status(500).json(false)
    }
    else {
      res.status(200).json(true)
    }
  })

});

router.post('/editproductpicture', upload.single("picture"), function (req, res, next) {
  console.log("BODY:", req.body)
  console.log("FILE:", req.file)
  pool.query('update productpictures  set image=? where pictureid=? ', [ req.body.myfilename,req.body.pictureid], function (error, result) {
    if (error) {
      res.status(500).json(false)
    }
    else {
      res.status(200).json(true)
    }
  })

});

router.post('/updatefinalproductdata', function (req, res, next) {
  console.log("BODY:", req.body)
  
  pool.query('update finalproduct set   productid=?, colorid=?, size=?, price=?, offertype=?, offerprice=?, description=?, stock=? where finalproductid=?', [req.body.finalproductname, req.body.color, req.body.size, req.body.price, req.body.offertype, req.body.offerprice, req.body.description,req.body.stock, req.body.finalproductid], function (error, result) {
    if (error) {
      res.status(500).json(false)
    }
    else {
      res.status(200).json(true)
    }
  })

});

router.post('/deletefinalproduct',  function (req, res, next) {
  console.log("BODY:", req.body)
  pool.query('delete from finalproduct  where finalproductid=? ', [req.body.finalproductid], function (error, result) {
    if (error) {
      res.status(500).json(false)
    }
    else {
      res.status(200).json(true)
    }
  })

});


router.post('/deletespeceficpicture',  function (req, res, next) {
  console.log("BODY:", req.body)
  pool.query('delete from productpictures  where pictureid=? ', [req.body.pictureid], function (error, result) {
    if (error) {
      res.status(500).json(false)
    }
    else {
      res.status(200).json(true)
    }
  })

});


router.post('/getallproductpicture', function (req, res, next){
  console.log(req.body)
  var q= "select * from productpictures where finalproductid = ?"
  pool.query(q, [req.body.finalproductid]
  ,function(error,result){
    console.log(error)
    if (error) {
      res.status(500).json([]);
    }
    else {
      res.status(200).json({data: result })
    }
  })
  })


module.exports = router;