const authController = require("../../controllers/authController"),
      apiResponse = require("../../controllers/apiresponse.js"),
      userController = require("../../libs/user.js"),
      jwtTokenController = require("../../controllers/jwtController");

//TODO:- make sure what is TOKEN score in from front-end
module.exports = (router) =>{
  "use strict";
  router.post("/api/v1/auth",(req,res)=>{
    try{
          jwtTokenController.decodeJWT(req.body.token).then((decoded)=>{
              decoded.userPassword = req.body.userPassword;
              req.body = decoded
              userController.checkBaseParam(req).then(()=>{
                 userController.createLocalUser(decoded).then((data)=>{
                       apiResponse(res,[data]); // {"data":{"accessToken": "ASDGHBSADHU", "refreshToken":"Adfasdfadsf"}}
                 }).catch((err) => {
                      apiResponse(res, null, err, err.code);
                 });
              }).catch((err)=>{
                  apiResponse(res, null, err, err.code);
              });
          }).catch((err)=>{
            apiResponse(res, null, err, err.code);
          })
    }catch(err){
        apiResponse(res, null, err, err.code);
    }
  })
  return router;
}
