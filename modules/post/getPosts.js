const apiResponse = require("../../controllers/apiresponse.js");
const friendController = require("../../libs/friend.js");

module.exports = (router) =>{
  "use strict";
  router.get("/api/v1/posts/:category?/:subcatergory?",(req,res)=>{
     try{
            var params = req.params
            var query =  req.query
            friendController.getPost(query.state,query.city,params.category,params.subcatergory).then((data)=>{
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
