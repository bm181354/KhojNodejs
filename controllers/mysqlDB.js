const config = require("../config/config.js");
const mysql = require('promise-mysql');
const global = require("../config/globals");

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'newpassword',
  database : 'mydb',
  connectionLimit: 20
});

module.exports.db = () =>{
"use strict";
    return new Promise((resolve,reject) => {
         connection.getConnection().then(function(conn){
           // console.log("connection established")
           global.setDatabase(connection)
           //console.log(connection)
           resolve()
           //
        }).catch((err)=>{
           console.log("ERROR on mySQLDB")
           reject(err);
        })
    });
};
