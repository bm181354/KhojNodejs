// all routes with be controlled by this
const userController = require("../../libs/user.js");
const apiResponse = require("../../controllers/apiresponse.js");

module.exports = (router) => {
    "use strict";
    console.log("outside createUser")
    router.post("/api/v1/user", (req, res) => {
           let userType = req.body.userType;
            console.log(req)
           // add validation of some sort
             if (userType === "custom") {
                   //
                   userController.createLocalUser(req.body).then(()=>{
                         apiResponse(res, true);
                   }).catch((err) => {
                        apiResponse(res, null, err, err.code);
                   });
                   // end
             }
    });
   return router;
  }
