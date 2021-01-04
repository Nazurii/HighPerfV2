var express = require('express');
var router = express.Router();

var ocrx = require('./../OpenCRX');

router.get('/worker', function(req, res, next){
    let list = ocrx.getAllCustomers();
    res.send(list);
});

router.get('/companies', function(req, res, next){
    let list = ocrx.getAllCompanies();
    res.send(list);
})

router.get('/products', function(req, res, next){
    let list = ocrx.getAllProducts();
    res.send(list);
})

router.get('/sales', function(req, res, next){
    let list = ocrx.getAllSales();
    res.send(list);
})

module.exports = router;