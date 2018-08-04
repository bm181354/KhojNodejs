const globals = require("../config/globals");
const mysql = require('promise-mysql');

//create getUserID

exports.findUserProfile = (UserID) =>{
 "use strict"
   // promise
}

exports.findUserByEmail = (email) => {
  "use strict"

  return new Promise((resolve,reject)=>{
     // got the connection
     const mysqlDB1 = globals.getDatabase()
     // if connection error
     try{
        // query that connection for the user
        mysqlDB1.query('select `*` from USERS').then(function(rows){
           // console.log(JSON.parse((rows))); // json file
           mysqlDB1.release();
           var data = JSON.parse(JSON.stringify(rows))
           resolve(data)  // if found
           //console.log(mysqlDB)
        }).catch((err) => {
           console.log("goes3")
           reject(err);   // if user not found
     });
   } catch (err){
      reject(err)
   }


  })

}
