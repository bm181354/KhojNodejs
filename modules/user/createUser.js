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
           console.log(userType)
            //console.log(req)
           //TODO:- add validation of some sort

           userController.checkBaseParam(req).then(()=>{
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

                   //TODO:- remove this and move to another route trigger when user click on email link
                   userController.createLocalUser(req.body).then((data)=>{
                         // instead of true send data variable
                         apiResponse(res,data); // {"data":{"accessToken": "ASDGHBSADHU", "refreshToken":"Adfasdfadsf"}}
                   }).catch((err) => {
                        apiResponse(res, null, err, err.code);
                   });
                   // end
             }
             else{
               // create third party
               /* YOUR CODE */
               console.log("facebook")
               userController.checkFacebook(req.body.accessToken,req.body.email).then((info)=>{
                 //
                 // TODO: check info object from lib/user
                 userController.create3partyUser(req.body).then((data)=>{
                    apiResponse(res,data);
                 })

               }).catch((err)=>{
                  console.log("ERR1")
                  apiResponse(res, null, err, err.code);
               })
             }
           }).catch((err)=>{
              apiResponse(res, null, err, err.code);
           })
    });
   return router;
  }
