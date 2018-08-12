const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const errors = require("../controllers/errorController");
const authModel = require("../models/auth");


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

exports.validateRefreshToken = (email,callback) => {
  "use strict";
    let result = {}

    userModel.getRefreshToken(email).then((data)=>{
       // check validity of refresh token []
       // create access token [X]
       // resolve({accessToken,RefreshToken})[X]
       console.log("GOT THE validateRefreshToken",data)
       var validate = true // change this
       if(true){
         // refresh token is not good anymore
         authModel.createRefreshToken(email,null).then(({data,refreshToken})=>{
             userModel.updateRefreshToken(email,refreshToken).then(()=>{
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
           result.error = errors.masterTokenGenerationError;
           result.result = false;
           result.code = result.error.code;
           callback(result);
         })

       }else{
          // refresh token is not good anymore // no need to access db
          console.log("email,data.refreshToken",email,data.refreshToken)
          authModel.createAccessToken(email,data.refreshToken).then((accessToken)=>{
            console.log("=======createAccessToken",accessToken)
            result.result = true;
            result.accessToken = accessToken;
            result.refreshToken = data.refreshToken
            callback(result);

          }).catch((err)=>{
            console.log(err,"==========++++err")
            result.error = errors.accessTokenGenerationError;
            result.result = false;
            result.code = result.error.code;
            callback(result);
          })


       }


    }).catch((err)=>{
      // can't get refresh_token
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
                      delete user[0].password;
                      authModel.createAccessToken(user[0].id,refreshToken).then((accessToken)=>{
                        result.result = true;
                        user[0].accessToken = accessToken
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
