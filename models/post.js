const globals = require("../config/globals");
const mysql = require('promise-mysql');
const errors = require("../controllers/errorController");



exports.createPost = (validInputs) =>
  "use strict";

  return new Promise((resolve,reject)=>{
     globals.getConn((err,conn) => {
       try{
            if(err){
               conn.release();
               reject(err)
             }
             var param = [validInputs.description,validInputs.title,validInputs.USERS_id,validInputs.category,validInputs.subcategory,validInputs.country,validInputs.city,validInputs.state]
              // query that connection for the user
             conn.query('INSERT INTO POST (description,title,USERS_id,category,subcategory,country,city,state) VALUES ?',param).then(function(rows){
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
