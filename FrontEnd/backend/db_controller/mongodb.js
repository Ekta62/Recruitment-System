
var MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcryptjs');

function MongoDB(){};



MongoClient.connect(url , function(err ,db){
    if (err) throw err;
    console.log("Database created!");
    db.close();
});

function connectMongoDB(database) {
    return MongoClient.connect(url + database);
}
