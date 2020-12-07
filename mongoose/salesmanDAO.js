const mongoose = require('mongoose');

var mongoUtil = require( './../mongoose/config' );
const salesMan = mongoose.model('salesmen');

const postSalesman = (req) =>{
    console.log("Post Salesman");
    new salesMan({
        id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }).save((error, result) => {
        logError(error);
        return result;
    });
};

const getAllSalesmen = () => {
    console.log("Get Salesmen");
    return salesMan.find({}, {_id:0, id:1, firstname:1, lastname:1}, function (error, salesmen){
        logError(error);
        return salesmen;
    });
};

const getSalesman = (id) => {
    console.log("Find salesman by id");
    return salesMan.find({id: id}, {_id:0, id:1, firstname:1, lastname:1}, function(error, salesman){
        logError(error);
        return salesman;
    });
};

const updateSalesman = (req) => {
    console.log("Update Salesman");
    salesMan.findOneAndUpdate({id: req.params.id}, {
        id: req.params.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }, {}, function(err, doc){
        logError(err);
    });
};

const deleteSalesman = (id) => {
    console.log("Delete Salesman by ID");
    salesMan.findOneAndDelete({id:id}, function(err, doc){
        logError(err);
    });
};



const logError = (error, result) => {
    if(error) {
        console.log(error);
    }
    if(result != null){
        console.log(result);
    }
};



exports.getAllSalesmen = getAllSalesmen;
exports.getSalesman = getSalesman;
exports.postSalesman = postSalesman;
exports.updateSalesman = updateSalesman;
exports.deleteSalesman = deleteSalesman;