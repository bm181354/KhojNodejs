// createAccessToken
// createRefreshToken
const jwt = require("jsonwebtoken")
const error = require('../controllers/errorController');
const config = require("../config/config");

// expires in 15 minutes
// doesn't go into database
// for 301 error
exports.createAccessToken = (email,refreshToken) => {
  "use strict";
  // get refreshToken from userID
  // create new JWT and send to the user
  return new Promise((resolve,reject) => {
    try{
     // check signature if not valid then reject (invalidMasterSignature)
     // for regeneration of accessToken
     console.log("createAccessToken")
      var  accessToken = jwt.sign({id:email,type:"access", iat: Math.floor(Date.now() / 1000) - 30
      }, config.CERT,{expiresIn: '1h'});
      resolve("bearer "+ accessToken)

    }catch (err){
      console.log("also",err)
      reject(error.accessTokenGenerationError)
    }
  })

}



// expires in 3 days
// ONLY through the mail they will get userIDToken
exports.createRefreshToken = (email,authAccessToken) => {
    "use strict";
    // has does createAccessToken alway
    return new Promise((resolve,reject) => {
          // create RefreshToken(userID)
       try{
           // for local authAccessToken will be null
           var authKey = /*(authAccessToken) ? authAccessToken : */ email;
           var  refreshToken = "bearer "+jwt.sign({id:authKey,type:"master", iat: Math.floor(Date.now() / 1000) - 30
           },config.CERT,{expiresIn: '7d'});
           //authAccessToken [Facebook access token] <-  this will be null for local
           this.createAccessToken(email,refreshToken).then((accessToken) => {
                    var data = {
                      "userEmail":email,
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

exports.createAccessToken = this.createAccessToken
