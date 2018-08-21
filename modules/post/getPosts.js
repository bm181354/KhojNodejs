const apiResponse = require("../../controllers/apiresponse.js");
const friendController = require("../../libs/friend.js");

module.exports = (router) =>{
  "use strict";
  router.get("/api/v1/posts/:category?/:subcategory?",(req,res)=>{
     try{
            var params = req.params
            var query =  req.query
            friendController.getPosts(query.state,query.city,params.category,params.subcategory,query.offset,query.size).then((data)=>{
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
