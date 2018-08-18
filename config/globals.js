/*
	Database initialization
*/
const mysqlDb = require("../controllers/mysqlDB")
var database;

// iOS like when definition
// database is now accessed by every modules from this project
// called from mysqlDB
exports.setDatabase = (dbInstance) => {
    database = dbInstance;
}

// main connection
exports.getDatabase = () => {
    "use strict";
    return database;
};

// this needs to be used [connections:pools]
exports.getConn = function(callback) {
   database.getConnection().then(function(connection) {
       callback(null, connection);
    }).catch(function(err) {
      console.log("getConn")
      callback(err, null);
    });
}

// initialized
exports.initDB = () => {

   return new Promise((resolve, reject) => {
       mysqlDb.db().then(() => {
        
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
