// createAccessToken
// createRefreshToken
const jwt = require("jsonwebtoken")
const error = require('../controllers/errorController');

// expires in 15 minutes
// doesn't go into database
// for 301 error
createAccessToken = (userID,refreshToken) => {
  "use strict";
  // get refreshToken from userID
  // create new JWT and send to the user
  return new Promise((resolve,reject) => {
    try{
     // check signature if not valid then reject (invalidMasterSignature)
     // for regeneration of accessToken
      var  accessToken = jwt.sign({id:userID, refreshToken, iat: Math.floor(Date.now() / 1000) - 30
      }, 'secretKey1',{expiresIn: '1h'});

      resolve(accessToken)
    }catch (err){
      console.log(err)
      reject(error.accessTokenGenerationError)
    }
  })

}
// expires in 3 days
// ONLY threw the mail they will get userIDToken
exports.createRefreshToken = (userID,authAccessToken) => {
    "use strict";
    // has does createAccessToken alway
    return new Promise((resolve,reject) => {
          // create RefreshToken(userID)
       try{
           // for local authAccessToken will be null
           var authKey = (authAccessToken) ? authAccessToken : userID;
           var  refreshToken = jwt.sign({authKey, iat: Math.floor(Date.now() / 1000) - 30
           }, 'secretKey',{expiresIn: '7d'});
           //authAccessToken [Facebook access token] <-  this will be null for local
           createAccessToken(userID,refreshToken).then((accessToken) => {
                    var data = {
                      "userID":userID,
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

exports.createAccessToken = createAccessToken
