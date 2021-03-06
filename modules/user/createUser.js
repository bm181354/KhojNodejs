// all routes with be controlled by this
const userController = require("../../libs/user.js");
const apiResponse = require("../../controllers/apiresponse.js");
const emailController = require("../../controllers/emailController")
const authController = require("../../controllers/authController");
const jwtTokenController = require("../../controllers/jwtController");

module.exports = (router) => {
    "use strict";
    console.log("outside createUser")
    router.post("/api/v1/user", (req, res) => {

      try{
           let userType = req.body.userType;
           let userEmail = req.body.email
           if (userType === "custom") {
             userController.checkDuplicateEmail(userEmail).then(()=>{
                   // send email
                   //req.body needs to be signed and attached with email
                   // link with link to this route
                   // move this to api/v1/emailVerify/:token
                   emailController.sendEmail(req.body).then((info)=>{
                        console.log("EMailSent")
                        // apiResponse(res, [info])
                         apiResponse(res, [{"isSuccess":true}]);
                   }).catch((err)=>{
                     apiResponse(res, null, err, err.code);
                   })


             }).catch((err)=>{
                apiResponse(res, null, err, err.code);
             })
           }
           else{
             // create third party
             /* YOUR CODE */
              userController.checkBaseParam(req).then(()=>{
                        console.log("facebook")
                        userController.checkFacebook(req.body.accessToken,req.body.email).then((info)=>{
                          // TODO: check info object from lib/user
                          userController.create3partyUser(req.body).then((data)=>{
                             apiResponse(res,[data]);
                          })

                        }).catch((err)=>{
                           console.log("ERR1")
                           apiResponse(res, null, err, err.code);
                        })
              }).catch((err)=>{
                      // login
                      userController.checkFacebook(req.body.accessToken,req.body.email).then((info)=>{
                        //TODO: id instead of req.body.email
                          console.log("createUser email /api/v1/user",req.body.email)
                        userController.emailtoID(req.body.email).then((data)=>{
                          console.log("createUser /api/v1/user", data.id)
                          authController.validateRefreshToken(data.id,(result)=>{
                              if(result.result){
                                result.id = data.id
                                result.name = data.name
                                result.email = data.email
                                result.username = data.username
                                apiResponse(res,[result]);
                              }else{
                                // error here
                                apiResponse(res,null,result.error,result.code);
                              }
                          })
                        }).catch(err=>{
                          apiResponse(res, null, err, err.code);
                        })

                }).catch((err)=>{
                        // auth error
                        apiResponse(res, null, err, err.code);
                })
              });

           }

           //////

     }catch(err){
       apiResponse(res, null, err, err.code);
     }

    });
   return router;
  }
