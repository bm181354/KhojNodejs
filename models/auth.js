// createAccessToken
// createRefreshToken
const jwt = require("jsonwebtoken")
const error = require('../controllers/errorController');
const config = require("../config/config");
 const jwtToken = require("../controllers/jwtController");


 //TODO:- check for validity of refreshToken and id
 // refreshToken body should consists of id
 exports.createAccessToken = (refreshToken) => {
   "use strict";
   // get refreshToken from userID
   // create new JWT and send to the user
   return new Promise((resolve,reject) => {
     try{
        var {id,isSuccess} = jwtToken.verifyAccessToken(refreshToken)
        console.log(isSuccess)
        if(isSuccess){
          console.log("createAccessToken:Success")
           var  accessToken = jwt.sign({id:id,type:"access", iat: Math.floor(Date.now() / 1000) - 30
           }, config.CERT,{expiresIn: '1h'});
           resolve(accessToken)
        }else{
           console.log("createAccessToken:fail")
           reject(error.accessTokenGenerationError)
        }
     }catch (err){
       console.log("also",err)
       reject(error.accessTokenGenerationError)
     }
   })
 }
// expires in 3 days
// ONLY through the mail they will get userIDToken
exports.createRefreshToken = (id,authAccessToken) => {
    "use strict";
    // has does createAccessToken alway
    return new Promise((resolve,reject) => {
          // create RefreshToken(userID)
       try{
           // for local authAccessToken will be null
           var authKey = /*(authAccessToken) ? authAccessToken : */ id;
           var  refreshToken = jwt.sign({id:authKey,type:"master", iat: Math.floor(Date.now() / 1000) - 30
           },config.CERT,{expiresIn: '7d'});
           //authAccessToken [Facebook access token] <-  this will be null for local
           this.createAccessToken(refreshToken).then((accessToken) => {
                    var data = {
                      "userId":id,
                      "access_token":accessToken,
                      "token_type": "bearer",
                      "refresh_token":refreshToken
                      }
                    console.log("check111",refreshToken)
                    resolve({data,refreshToken})
            }).catch((err) => {
                    // can't create accessToken
                    console.log(err)
                    reject(error.accessTokenGenerationError)
            });
          }catch (err){
            // error can't create refreshToken
            console.log(err)
            reject(error.masterTokenGenerationError)
          }

      });
}
