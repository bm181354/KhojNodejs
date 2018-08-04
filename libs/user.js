const errors = require("../controllers/errorController")
const bcrypt = require("bcrypt")
const userModel = require("../models/user");
// validation
// creation here

exports.createLocalUser = (inputs) => {

    return new Promise ((resolve, reject) => {
         if (inputs.userPassword === undefined){
           reject()
         }
         bcrypt.hash(inputs.userPassword, 10, function(err, hashPassword) {
         if(err){
           reject(errors.cannotCreatePassword)
         }
         inputs.userPassword = hashPassword
         // Store hash in your password DB.
         userModel.insertUser(inputs).then((user)=>{
            resolve();
         }).catch((err) =>{
            reject(err);
           });

         //resolve()
        });


    })

}
