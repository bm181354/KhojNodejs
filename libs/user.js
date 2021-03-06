const errors = require("../controllers/errorController")
const bcrypt = require("bcrypt")
const userModel = require("../models/user")
const authModel = require("../models/auth")
const postModel = require("../models/post")
const FB = require('fb');
// validation
// creation here

// TODO:- add token as well
exports.createLocalUser = (inputs) => {
    "use strict";
    return new Promise ((resolve, reject) => {

         if (inputs.userPassword === undefined || typeof inputs.userPassword !== "string"){
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
             //inputs.refreshToken = refreshToken ---1
             userModel.insertUser(inputs).then((user)=>{
                    authModel.createRefreshToken(user.insertId,authAccessToken).then(({data,refreshToken})=>{
                        userModel.updateRefreshToken(refreshToken,user.insertId).then((newCheck)=>{
                            data.refresh_token = refreshToken;
                            resolve(data);
                        }).catch((err)=>{
                            reject(err);
                        })
                    }).catch((err)=>{
                        reject(err);
                    });//createRefreshToken


                 }).catch((err) =>{
                    reject(err);
                  }); // insertUser


              })

    })
}
// MARK: - creation through facebook or some other party
// inputs == req.body
/*
TODO:-
1. Check access token with graph.facebook/me/accessToken={accesstoken}
2. if JWT signature and user name, user id matches then       [if no, send error.notAuthorized]
3. Check wheather user exists or not on MySqlDB [if yes, send error.duplicateAccount rught away]
4. Create user [repeat from createLocalUser] and additional send custom access_token and refresh_token <only for facebook>
*/
exports.create3partyUser = (user) => {
"use strict";
  return new Promise((resolve,reject)=>{
    //
    if (user.accessToken === undefined || typeof user.accessToken !== "string") {
            reject(errors.paramCorrupted);
        }
        userModel.insertUser(user).then((dbData) => {
           console.log("DATA", dbData)
            authModel.createRefreshToken(dbData.insertId,user.accessToken).then(({data,refreshToken})=>{
              console.log("refreshToken", refreshToken,dbData.insertId)
              userModel.updateRefreshToken(refreshToken,dbData.insertId).then((newCheck)=>{
                      console.log("newCheck ",newCheck)
                      data.refresh_token = refreshToken;
                      resolve(data);
                  }).catch((err)=>{
                      console.log(err)
                      reject(err);
                  })
              }).catch((err)=>{
                console.log(err)
                reject(err);
              });//createRefreshToken
          }).catch( (dbError) => {
                console.log(err)
                reject(dbError);
          });

    })
}

//checker (2DB request)
/**
 *
 * @param req object containing user info [.userType,.userEmail]
 * @param callback function with err and data param
 * @returns the promise object which encap either error/false or true
 */
exports.checkBaseParam = (req) =>{
  "use strict";

  return new Promise((resolve,reject)=>{

        if (req.body.email === undefined || req.body.username === undefined || req.body.userType === undefined || req.body.name === undefined) {
            reject(errors.paramMissing);
        }

        if (typeof req.body.email !== "string" || typeof req.body.username !== "string" || typeof req.body.userType !== "string" || typeof req.body.name !== "string") {
            reject(errors.paramCorrupted);
        }

        this.checkDuplicateEmail(req.body.email).then((isDuplicate)=>{
          if (isDuplicate) {
               console.log("duplicateEmail")
               reject(errors.duplicateEmail);
           }else{
             // valid email
              this.checkDuplicateUsername(req.body.username).then((isDuplicateUsername)=>{
                if(isDuplicateUsername){
                  console.log("duplicateUsername")
                  reject(errors.duplicateUsername)
                }else{
                  // valid username
                  resolve()
                }
              }).catch((err)=>{
                reject(err)
              })
           }
        }).catch((err) =>{
          reject(err)
        });

  });
}

exports.checkDuplicateEmail = (email) =>{
  return new Promise((resolve, reject) => {

        if (email === undefined ) {
            reject(errors.paramMissing);
        }

        if (typeof email !== "string") {
            reject(errors.paramCorrupted);
        }

        userModel.findUserByEmail(email).then((user) => {
            if (user === null || user.length < 1) {
                console.log("user:",user)
                resolve(false);
            } else {
                console.log("exist user:",user.length)
                resolve(true);
            }
        }).catch((err) => {
            reject(err);
        });
    });
}

exports.checkDuplicateUsername = (username) =>{
  return new Promise((resolve,reject)=>{

    if ( username === undefined) {
        reject(errors.paramMissing);
    }
    console.log("Username" ,(username))
    if ( typeof username !== "string") {
        reject(errors.paramCorrupted);
    }

    userModel.findUserByUsername(username).then((user) => {
        if (user === null || user.length < 1) {
            resolve(false);
        } else {
            resolve(true);
        }
    }).catch((err) => {
        reject(err);
    });
  })
}

exports.checkFacebook = (accessToken,email) => {

  return new Promise((resolve,reject)=>{
    console.log("checkFacebook")

    FB.options({ accessToken: accessToken});
    FB.api('/me?fields=id,name,email', function (res) {

      if(res && res.error) {

          if(res.error.code === 'ETIMEDOUT') {
              reject(res)
              console.log('request timeout');
          }
          else {
              reject(res)
              console.log('error', res.error);
          }
      }
      else {
            // check and send the boolean
            if (res.email == email){
              resolve(res) // if email matches
            }else{
              reject(res)
            }
        console.log(res);
      }
    });
  })
}

//getID from email
exports.emailtoID = (email) =>{
   return new Promise((resolve,reject)=>{
      console.log("lib/user.js emailtoID", email)
      userModel.getIDFromEmail(email).then((data)=>{
        console.log("lib/user.js emailtoID userModel.getIDFromEmail", data)
        resolve(data)
      }).catch((err)=>{
        console.log("ERROR lib/user.js emailtoID", data.id)
        reject(err)
      })
   })
}

// Post Create
exports.addPost = (req) =>{
   return new Promise((resolve,reject) =>{
     postModel.addPostDB(req).then((data)=>{
       resolve(data)
     }).catch((err)=>{
       reject(err)
     })
   })
}
