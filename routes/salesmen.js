var express = require('express');
var router = express.Router();

var salesmanDAO = require('./../mongoose/salesmanDAO');
var recordsDAO = require('./../mongoose/recordsDAO');

//POST salesman
router.post('/', function(req, res, next) {
    salesmanDAO.postSalesman(req);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end();
});

//GET all salesmen
router.get('/', function(req, res, next){
    salesmanDAO.getAllSalesmen().then((salesmen) => {
        res.writeHead(200, {'Content-Type':'application/json'});
        res.write(JSON.stringify(salesmen));
        res.end();
    });
});

//GET salesman by id
router.get('/:id', function(req, res, next) {
    salesmanDAO.getSalesman(req.params.id).then((salesmen) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(salesmen));
        res.end();
    });
});

//UPDATE salesman
router.put('/:id', function(req, res, next){
    salesmanDAO.updateSalesman(req);
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end();
});

//DELETE salesman by id
router.delete('/:id', function (req, res, next){
    salesmanDAO.deleteSalesman(req.params.id);
    recordsDAO.deleteAll(req.params.id);
    res.writeHead(200, {'Content-Type':'applications/json'});
    res.end();
});

module.exports = router;