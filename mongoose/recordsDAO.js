const mongoose = require('mongoose');

var mongoUtil = require( './../mongoose/config' );
const records = mongoose.model('records');


const postRecord = (req) => {
    console.log("Put Record");
    new records({
        id: req.body.id,
        goal_id: req.body.goal_id,
        goal_descr: req.body.goal_descr,
        targetVal: req.body.targetVal,
        actualVal: req.body.actualVal,
        year: req.body.year
    }).save((error, result) => {
        logError(error);
        return result;
    });
};

const getRecordById = (id) => {
    console.log("Get Records By ID");
    return records.find({id:id},
        {_id:0, id:1, goal_id:1, goal_descr:1, targetVal: 1, actualVal: 1, year: 1},
        function(error, record){
        logError(error);
        return record;
    });
};

const getRecordByGoalId = (id, goal_id) => {
    console.log("Get Record By ID & GoalId");
    return records.find({id:id, goal_id:goal_id},
        {_id:0, id:1, goal_id:1, goal_descr:1, targetVal: 1, actualVal: 1, year: 1},
        function(error, record){
        logError(error);
        return record;
    });
};

const putRecord = (req) => {
    console.log("Update Record");
    records.findOneAndUpdate({id: req.params.id, goal_id: req.params.goal_id}, {
        goal_descr: req.body.goal_descr,
        targetVal: req.body.targetVal,
        actualVal: req.body.actualVal,
        year: req.body.year
    }, {}, function(err, doc){
        logError(err);
    });
}

const deleteRecord = (req) => {
    console.log("Delete Record By ID & Goal ID");
    records.findOneAndDelete({id:req.params.id, goal_id:req.params.goal_id}, function(err, doc){
        logError(err);
    });
};

exports.getRecordById = getRecordById;
exports.postRecord = postRecord;
exports.putRecord = putRecord;
exports.deleteRecord = deleteRecord;
exports.getRecordByGoalID = getRecordByGoalId;



const logError = (error, result) => {
    if(error) {
        console.log(error);
    }
    if(result != null){
        console.log(result);
    }
};