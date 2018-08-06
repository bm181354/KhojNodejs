const errors = require("../controllers/errorController")
const bcrypt = require("bcrypt")
const userModel = require("../models/user")
const authModel = require("../models/auth")
// validation
// creation here

// TODO:- add token as well
exports.createLocalUser = (inputs) => {
    "use strict";
    return new Promise ((resolve, reject) => {

         if (inputs.userPassword === undefined){
            console.log("check")
            reject(errors.paramCorrupted);
         }

         bcrypt.hash(inputs.userPassword, 10, function(err, hashPassword) {
             if(err){
               console.log("cannotCreatePassword - user.js")
               reject(errors.cannotCreatePassword)
             }
             // create Refresh Token
             inputs.userPassword = hashPassword
             //inputs.refreshToken = refreshToken
             // create userID with hash(email_address)
             var authAccessToken = null // for custom
             authModel.createRefreshToken(inputs.id,authAccessToken).then(({data,refreshToken})=>{
                 //Store hash in your password DB.
                 console.log("check",refreshToken)
                 console.log("data",data)
                 inputs.refreshToken = refreshToken
                 userModel.insertUser(inputs).then((user)=>{
                    resolve(data);
                 }).catch((err) =>{
                    reject(err);
                  }); // insertUser
                }).catch((err)=>{
                    reject(err);
                });//createRefreshToken

              })

    })
}
// MARK: - creation through facebook or some other party
exports.create3partyUser = (inputs) => {



}
