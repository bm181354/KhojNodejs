const jwtTokenController = require("../../controllers/jwtController"),
      apiResponse = require("../../controllers/apiresponse.js"),
      userController = require("../../libs/user.js");

module.exports = (router)=>{
  "use strict";
  router.get("/api/v1/token/:emailtoken",(req,res)=>{
      const params = req.params
      jwtTokenController.decodeJWT(params.emailtoken).then((decoded)=>{
          req.body = decoded
          userController.checkDuplicateEmail(req.body.email).then(()=>{
              apiResponse(res, [{"isValid":true}]);
          }).catch((err)=>{
              apiResponse(res, null, err, err.code);
          });
      }).catch((err)=>{
          apiResponse(res, null, err, err.code);
      });
  });
  return router;
}
