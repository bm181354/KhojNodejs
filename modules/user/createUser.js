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
           console.log(userType)
            //console.log(req)
           //TODO:- add validation of some sort
           //////
           if (userType === "custom") {
             userController.checkBaseParam(req).then(()=>{
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
                         apiResponse(res,[data]); // {"data":{"accessToken": "ASDGHBSADHU", "refreshToken":"Adfasdfadsf"}}
                   }).catch((err) => {
                        apiResponse(res, null, err, err.code);
                   });
                   // end

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
                        userController.emailtoID(req.body.email).then((id)=>{
                          authController.validateRefreshToken(id,(result)=>{
                              // error here
                              if(result.result){
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
