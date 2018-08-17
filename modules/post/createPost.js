const userController = require("../../libs/user.js");
const apiResponse = require("../../controllers/apiresponse.js");
const emailController = require("../../controllers/emailController")
const authController = require("../../controllers/authController");


module.exports = (router) => {
  "use strict";
  router.post("/api/v1/createPost",(req,res)=>{
    try{
      // var id = req.data
      //  console.log("ID",req.data.id)
      //  USERS_id
      console.log("data",req.body)
       userController.addPost(req).then((data)=>{
         apiResponse(res,[data]);
       }).catch((err)=>{
         apiResponse(res,null,err,err.code);
       })
    }catch(err){
        apiResponse(res, null, err, err.code);
    }

  })
  return router;
}
