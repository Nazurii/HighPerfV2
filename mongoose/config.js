var mongoose = require('mongoose');
var mongodb = 'mongodb://127.0.0.1/highperformance';

mongoose.connect(mongodb, { useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let schema = mongoose.Schema;

let salesmenSchema = new schema({
    id: Number,
    firstname: String,
    lastname: String
})

const salesmenModel = mongoose.model('salesmen', salesmenSchema);

let recordsSchema = new schema({
    id: Number,
    goal_id: Number,
    goal_descr: String,
    targetVal: Number,
    actualVal: Number,
    year: Number
})

const recordModel = mongoose.model('records', recordsSchema);