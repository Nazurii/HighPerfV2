var express = require('express');
var router = express.Router();
const qs = require('querystring');

var ohrm = require('./../OrangeHRM.js');

router.get('/employees', function(req, res, next){
    console.log("ohrm.js - /employees");
    ohrm.getOrangeHRMToken().then(() => {
        ohrm.getAllEmployees().then(result => {
            res.writeHead(200, {'Content-Type':'application/json'});
            res.write(JSON.stringify([...result.values()]));
            res.end();
        });
    });
});

router.post('/:id/bonussalary', function(req,res,next){
    ohrm.getOrangeHRMToken().then(() => {
        ohrm.postBonusSalary(req.params.id, req.body.year, req.body.value).then(result => {
            res.writeHead(200, {'Content-Type':'application/x-www-form-urlencoded', 'Accept': 'application/json'});
            res.write(qs.stringify(result));
            res.end();
        });
    });
});

router.get('/employees/:id', function(req,res, next){
    console.log("ohrm.js - /employees/:id");
    ohrm.getOrangeHRMToken().then(() => {
        ohrm.getEmployeeById(req.params.id).then(result => {
            res.writeHead(200, {'Content-Type':'application/json'});
            res.write(JSON.stringify(result));
            res.end();
        });
    });
});

router.get('/salesmen', function(req, res, next){
    console.log("ohrm.js - /salesmen");
    ohrm.getOrangeHRMToken().then(() => {
        ohrm.getSalesmen().then(result => {
            res.writeHead(200, {'Content-Type':'application/json'});
            res.write(JSON.stringify([...result.values()]));
            res.end();
        });
    });
});


module.exports = router;
