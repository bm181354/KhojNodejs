// all routes with be controlled by this
const userController = require("../../libs/user.js");
const apiResponse = require("../../controllers/apiresponse.js");
const emailController = require("../../controllers/emailController")

module.exports = (router) => {
    "use strict";
    console.log("outside createUser")
    router.post("/api/v1/user", (req, res) => {
           let userType = req.body.userType;
           let userEmail = req.body.email
           console.log(userEmail)
            //console.log(req)
           // add validation of some sort
             if (userType === "custom") {
                   // send email
                   //req.body needs to be signed and attached with email
                   // link with link to this route

                   // move this to api/v1/emailVerify/:token

                   /******
                   emailController.sendEmail(userEmail).then(()=>{
                        console.log("EMailSent")
                   }).catch((err)=>{
                     apiResponse(res, null, err, err.code);
                   })******/

                   // remove this
                   userController.createLocalUser(req.body).then((data)=>{
                         // instead of true send data variable
                         apiResponse(res,data); // {"data":{"accessToken": "ASDGHBSADHU", "refreshToken":"Adfasdfadsf"}}
                   }).catch((err) => {
                        apiResponse(res, null, err, err.code);
                   });
                   // end
             }
             // create third party
    });
   return router;
  }
