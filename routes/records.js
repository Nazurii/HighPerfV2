var express = require('express');
var router = express.Router();

var recordsDAO = require('./../mongoose/recordsDAO');

//POST record
router.post('/', function(req, res, next){
    recordsDAO.postRecord(req);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end();
});

//GET ALL records from salesman
router.get('/:id', function(req, res, next){
    recordsDAO.getRecordById(req.params.id).then((records) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(records));
        res.end();
    });

});

//GET records by goal id
router.get('/:id/:goal_id', function(req, res, next){
    recordsDAO.getRecordByGoalID(req.params.id, req.params.goal_id).then((records) => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(records));
        res.end();
    });
});

//PUT record
router.put('/:id/:goal_id', function(req, res, next){
    recordsDAO.putRecord(req);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end();
});

//DELETE record by ID
router.delete('/:id/:goal_id', function(req, res, next){
    recordsDAO.deleteRecord(req);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end();
});

module.exports = router;