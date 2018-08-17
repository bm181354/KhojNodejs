const globals = require("../config/globals");
const mysql = require('promise-mysql');
const errors = require("../controllers/errorController");



exports.addPostDB = (req) =>{
  "use strict";
  return new Promise((resolve,reject)=>{
     console.log("req.body0", req.body)
     globals.getConn((err,conn) => {
       try{
            if(err){
               conn.release();
               reject(err)
             }
             console.log("req.body", req.body)
             const validInputs = req.body
             const metaInputs =  req.data
             const formatedMysqlString = (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
             var param = [validInputs.description,validInputs.title,metaInputs.id,validInputs.category,validInputs.subcategory,validInputs.country,validInputs.city,validInputs.state,formatedMysqlString]
              // query that connection for the user
             console.log(param)
             conn.query('INSERT INTO POST (description,title,USERS_id,category,subcategory,country,city,state,date) VALUES (?,?,?,?,?,?,?,?,?)',param).then(function(rows){
                 conn.release();
                 var data = JSON.parse(JSON.stringify(rows))
                 resolve(data);  // if found
              }).catch((err) => {
                 conn.release();
                 reject(err);   // if user not found
           });

     } catch (err){
        reject(errors.defaultDbError)
     }//

     });

  });

}

//TODO:- change the 7 into offset and real limit
exports.getPostDB = (state,city,category,subcategory) =>{
     return new Promise((resolve,reject)=>{
       globals.getConn((err,conn) => {
         try{
              if(err){
                 conn.release();
                 reject(err)
               }else{
                   var parameter = [state,city,category,subcategory,7]
                   console.log("parameter",parameter)
                   conn.query('SELECT * FROM POST WHERE (state = ? or city = ? ) and (category = ? or subcategory = ?) ORDER BY id DESC LIMIT 7 OFFSET ?',parameter).then((rows)=>{
                      console.log(rows)
                      conn.release();
                      var data = JSON.parse(JSON.stringify(rows))
                      resolve(data);  // if found
                   }).catch((err) => {
                      conn.release();
                      reject(err);   // if user not found
                   });
              }
     //
          }catch (err){
              reject(errors.defaultDbError)
            }//
        })
      })

}
