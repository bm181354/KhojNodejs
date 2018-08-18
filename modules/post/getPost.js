const apiResponse = require("../../controllers/apiresponse.js");
const friendController = require("../../libs/friend.js");

module.exports = (router) =>{
  "use strict";
  router.get("/api/v1/post/:id",(req,res)=>{
      try{
            var params = req.params
            // create fake data for query
            friendController.getParticularPost(params.id).then((data)=>{
                  apiResponse(res,data)
              }).catch((err)=>{
                  apiResponse(res,null,err,err.code)
              });
      }catch(err){
          apiResponse(res, null, err, err.code);
      }

  });
  return router;
}
