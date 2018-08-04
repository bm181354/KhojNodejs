
const authController = require("../../controllers/authController");

// create validateUserByEmail
// this is being called by server.js
module.exports = (router) => {
    "use strict";
      router.post("/api/v1/login", (req, res) => {
      /* your code for invoking validateUserByEmail() and define the callback/closure here*/
      authController.validateUserByEmail(req.body.userEmail, req.body.password,req.body.secret, (userResponse) => {

         //console.log(userResponse)
         if(userResponse.result){
            console.log("login.js, authController.validateUserByEmail",userResponse.result)
           }

        });
    });
      return router
}
