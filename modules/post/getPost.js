const apiResponse = require("../../controllers/apiresponse.js");
const friendController = require("../../libs/friend.js");

module.exports = (router) =>{
  "use strict";
  router.get("/api/v1/posts/:category?/:subcatergory?",(req,res)=>{
      var param = req.param
      console.log(param)

      //TODO:- change parameter
      // req.query.state
      //req.param.subcatergory

      // create fake data for query
      friendController.getPost("MA",null,null,"IT").then((data)=>{
            apiResponse(res,data)
        }).catch((err)=>{
            apiResponse(res,null,err,err.code)
        });


  });
  return router;
}
