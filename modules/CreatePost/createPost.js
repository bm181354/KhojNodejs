const userController = require("../../libs/user.js");
const apiResponse = require("../../controllers/apiresponse.js");
const emailController = require("../../controllers/emailController")
const authController = require("../../controllers/authController");


module.exports = (router) => {
  "use strict";

  router.post("api/v1/createPost",(req,res)=>{
    try{
      
    }catch(err){
      apiResponse(res, null, err, err.code);
    }

  })
  return router;
}
