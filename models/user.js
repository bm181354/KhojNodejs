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
   globals.getConn((err,conn) => {

       // if no connection error
       try{

         if(err){
           conn.release();
           reject(err)
         }

         var param = [email]
          // query that connection for the user
          conn.query('SELECT * from USERS WHERE email=?',param).then(function(rows){
             // console.log(JSON.parse((rows))); // json file
             conn.release();
             var data = JSON.parse(JSON.stringify(rows))
             resolve(data);  // if found
             //console.log(mysqlDB)
          }).catch((err) => {
             conn.release();
             reject(err);   // if user not found
       });

     } catch (err){
        reject(errors.defaultDbError)
     }//

     })

  })
}

exports.insertUser = (user) => {

  return new Promise((resolve, reject) =>{
    "use strict"
    // setup here
    const mysqlDB2 = globals.getDatabase()

     globals.getConn((err,conn) => {

      try{
            if(err){
              conn.release();
              reject(err)
            }
            var param = [user.id,user.name,user.email,user.phone_no,user.age,user.username,user.userPassword,user.refreshToken,user.userType]
            conn.query("INSERT INTO USERS (id,name,email,phone_no,age,username,userPassword,refreshToken,userType) VALUES (?,?,?,?,?,?,?,?,?)",param).then(function(rows){
               // console.log(JSON.parse((rows))); // json file
            conn.release();
            var data = JSON.parse(JSON.stringify(rows))
            resolve(data)  // if found
               //console.log(mysqlDB)
            }).catch((err) => {
               conn.release();
               console.log("err")
               reject(err);   // if didn't insert
          });

          }catch(err){
            reject(errors.defaultDbError)
          }
       }); // end of getConn
  } ) //
}
