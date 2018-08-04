// query and related with database
const globals = require("../config/globals");
const mysql = require('promise-mysql');
const errors = require("../controllers/errorController");

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
       console.log(email)
       var param = [email]
       console.log(email)
        // query that connection for the user
        mysqlDB1.query('SELECT * from USERS WHERE email=?',param).then(function(rows){
           // console.log(JSON.parse((rows))); // json file
           //mysqlDB1.release();
           var data = JSON.parse(JSON.stringify(rows))
           resolve(data)  // if found
           //console.log(mysqlDB)
        }).catch((err) => {
           console.log("goes311")
           reject(err);   // if user not found
     });
   } catch (err){
      reject(err)
   }
  })
}

exports.insertUser = (user) => {

  return new Promise((resolve, reject) =>{
    "use strict"
    // setup here
    const mysqlDB2 = globals.getDatabase()
    try{
      var param = [user.id,user.name,user.email,user.phone_no,user.age,user.username,user.userPassword,user.refreshToken,user.userType]
      mysqlDB2.query("INSERT INTO USERS (id,name,email,phone_no,age,username,userPassword,refreshToken,userType) VALUES (?,?,?,?,?,?,?,?,?)",param).then(function(rows){
         // console.log(JSON.parse((rows))); // json file
         //mysqlDB2.release();
         var data = JSON.parse(JSON.stringify(rows))
         resolve(data)  // if found
         //console.log(mysqlDB)
      }).catch((err) => {
         reject(err);   // if didn't insert
    });

    }catch(err){
      reject(errors.defaultDbError)
    }
  } ) //
}
