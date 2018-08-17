const apiResponse = require("../../controllers/apiresponse.js");
const jwtTokenController = require("../../controllers/jwtController");

module.exports = (router) =>{
    "use strict";
    router.post("/api/v1/accessToken", (req,res)=>{
        jwtTokenController.createNewAccessToken(req).then(({data,refreshToken})=>{
          apiResponse(res,data);
        }).catch((err)=>{
          apiResponse(res, null, err, err.code);
        })
    });
    return router;
}
