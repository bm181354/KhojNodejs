const userController = require("../../libs/user.js");
const apiResponse = require("../../controllers/apiresponse.js");
const emailController = require("../../controllers/emailController")
const authController = require("../../controllers/authController");
const errors = require("../../controllers/errorController");


module.exports = (router) => {
  "use strict";
  router.post("/api/v1/createpost",(req,res)=>{
    try{
      if(req.body.description && req.body.title && (req.body.category  && req.body.subcategory) && req.body.country && (req.body.city || req.body.state)){
           userController.addPost(req).then((data)=>{
             apiResponse(res,[data]);
           }).catch((err)=>{
             apiResponse(res,null,err,err.code);
           })
         }else{
             apiResponse(res,null,errors.paramMissing,errors.paramMissing.code);
         }

    }catch(err){
            apiResponse(res, null, err, err.code);
    }

  })
  return router;

}
