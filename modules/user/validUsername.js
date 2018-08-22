const userController = require("../../libs/user.js");
const apiResponse = require("../../controllers/apiresponse.js");
const emailController = require("../../controllers/emailController")
const authController = require("../../controllers/authController");
const errors = require("../../controllers/errorController");
const jwtTokenController = require("../../controllers/jwtController");

module.exports = (router) =>{
  router.get("/api/v1/validate/:username",(req,res)=>{
        "use strict";
        userController.checkDuplicateUsername(req.params.username).then((isDuplicate)=>{
            if(isDuplicate){
              const err = errors.duplicateUsername
              apiResponse(res,null,err,err.code);
            }else{
              apiResponse(res, [{"isSuccess":true}]);
            }
        }).catch((err)=>{
            apiResponse(res, null, err, err.code);
        })
  })

  return router;
}
