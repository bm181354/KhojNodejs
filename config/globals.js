/*
	Database initialization
*/
const mysqlDb = require("../controllers/mysqlDB")
let database;

// iOS like when definition
// database is now accessed by every modules from this project
// called from mysqlDB
exports.setDatabase = (dbInstance) => {
    database = dbInstance;
}

exports.getDatabase = () => {
    "use strict";
    return database;
};

exports.getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
}

// initialized
exports.initDB = () => {

   return new Promise((resolve, reject) => {
       mysqlDb.db().then(() => {
        console.log("inside db")
          resolve()
       }).catch((err) => {
       reject(err)
       })
   });
};

// close connection
exports.closeDB = () => {
    database.close();
}

// exports.selectionDB = () => {
//     database.query('select `*` from USERS').then(function(rows){
//     console.log(JSON.stringify(rows));
//     database.release();
//   });
// }
