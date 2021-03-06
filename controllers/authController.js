const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const errors = require("../controllers/errorController");
const authModel = require("../models/auth");
const jwtToken = require("../controllers/jwtController");

//


// validation of user with bcrypt
//3
let validateLoginCustom = (password, dbPassword, callback) => {
    "use strict";
    bcrypt.compare(password, dbPassword, (err, res) => {
            if(res) {
                console.log("Password is good")
                callback(true);
            } else {
                console.log("Password is bad")
                callback(false);
            }
        });
    //callback(true);
}
// callee is validateUserByEmail
let validateLoginByType = (userType, password, dbPassword,/* dbUserSeecret, user3rdId, userId, userSeecret,*/ callback) => {
        "use strict";

  console.log(userType, password, dbPassword) ;
	if (userType === "custom") {
	    //2
		validateLoginCustom(password, dbPassword, callback);
	}  else if (userType === "facebook") {
     callback(false);
  	//validateLoginFacebook(password, dbPassword, user3rdId, userId, callback);
  } //else if (userType === "google") {
// 		validateLoginGoogle(password, dbPassword, user3rdId, userId, callback);
// 	} else if (userType === "twitter") {
// 		validateLoginTwitter(password, userSeecret, dbPassword, dbUserSeecret, user3rdId, userId, callback);
	//}
	else {
		callback(false);
	}
}

exports.validateRefreshToken = (id,callback) => {
  "use strict";
    let result = {}
    console.log("idsuppose",id)
    userModel.getRefreshToken(id).then((data)=>{
       // check validity of refresh token []
       // create access token [X]
       // resolve({accessToken,RefreshToken})[X]
       console.log("GOT THE validateRefreshToken from userModel.getRefreshToken",data)
       console.log(data)
       //TODO:- create a validator of JWT {CHECKS}
       var {data_,isValidate} = jwtToken.verifyAccessToken(data.refreshToken)
       console.log("authModel.validateRefreshToken",isValidate)
       if(isValidate == false){
         // refresh token is not good anymore
             authModel.createRefreshToken(id,null).then(({data,refreshToken})=>{
                 userModel.updateRefreshToken(id,refreshToken).then(()=>{
                   result.result = true;
                   result.accessToken = data.access_token;
                   result.refreshToken = refreshToken
                   callback(result);
                 }).catch((err)=>{
                   console.log("validateRefreshToken")
                   result.error = err;
                   result.result = false;
                   result.code = result.error.code;
                   callback(result);
                 })
             }).catch((err)=>{
               console.log(err)
               result.error = errors.masterTokenGenerationError;
               result.result = false;
               result.code = result.error.code;
               callback(result);
             })

       }else{
          // refresh token is not good anymore // no need to access db
              console.log("Data.refreshToken",data.refreshToken)
              authModel.createAccessToken(data.refreshToken).then((accessToken)=>{
                result.result = true;
                result.accessToken = accessToken;
                result.refreshToken = data.refreshToken
                callback(result);

              }).catch((err)=>{
                result.error = errors.accessTokenGenerationError;
                result.result = false;
                result.code = result.error.code;
                callback(result);
              })
       }
    }).catch((err)=>{
      // can't get refresh_token
      console.log(err)
      result.error = errors.notFound;
      result.result = false;
      result.code = result.error.code;
      callback(result);
    });
}

// this will be called from server to be verify
//1  (email, password, secret, callback) <= this came to 3
exports.validateUserByEmail = (email, password, seecret, callback) => {
    "use strict";

    let result = {},
        userPassword = "";
        //userSeecret = null,
       // user3rdId = null


    // search with username
    // change this to username[ unique ] instead of email
    userModel.findUserByEmail(email).then((user) => {

        console.log(email, password, seecret);
        try {
          // user null not working
          if (user !== null &&  user.length !== 0) {
              console.log(user == null)
              // 3rd party will use user.accesToken
              userPassword = user[0].userPassword //(user.userType === "custom") ? user.userPassword : user.accessToken;
              //userSeecret = (user.accessTokenSecret) ? user.accessTokenSecret : null;
              //user3rdId = (user.user3rdId !== undefined) ? user.user3rdId : null;
              var userType = user[0].userType;
              // vaerify if it is valid first then:
              var refreshToken = user[0].refreshToken;

              console.log("FOUND")
              validateLoginByType(userType, password, userPassword, /*userSeecret, user3rdId, user._id, seecret,*/ (valid) => {
                  if (valid) {
                      console.log(valid)
                      console.log(user[0].id)
                      delete user[0].password;
                      authModel.createAccessToken(refreshToken).then((accessToken)=>{
                        result.result = true;
                        user[0].accessToken = accessToken
                        user[0].refreshToken = refreshToken
                        console.log("USER IS THERE: ",user[0])
                        result.data = user;
                        result.accessToken = accessToken
                        console.log("login-accesstoken",accessToken)
                        callback(result);
                      }).catch((err)=>{
                        result.error = errors.accessTokenGenerationError;
                        result.result = false;
                        result.code = result.error.code;
                        callback(result);
                      })
                  } else {
                      result.error = errors.notAuthorized;
                      result.result = false;
                      result.code = result.error.code;
                      callback(result);
                  }
              });
          } else {
              console.log(result.error)
              result.error = errors.loginNotFound;
              result.result = false;
              result.code = result.error.code;
              callback(result);
          }

        }catch(err){
          // null values when user is found
          result.error = err;
          result.code = err.code;
          result.result = false;
          callback(result);
        }

    }).catch((err) => {
       // no user found
        console.log("here")
        result.error = err;
        result.code = err.code;
        result.result = false;
        callback(result);
    });
};
/////////////
