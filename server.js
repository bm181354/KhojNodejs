/**
 * Created by bikenMaharjan<bikenm.us> on 08/03/2018.
 */

 const express = require("express");
 const globals = require("./config/globals");
 const jwtToken = require("./controllers/jwtController");

 //const Ddos = require('ddos');  ---*
/* For testing purpose remove the code
*  resets every seconds
*/
 //var ddos = new Ddos({burst:10, limit:15}) //---*
 var app = express();

 let bodyParser = require("body-parser");
 router = express.Router();

app.disable('etag');
app.use(bodyParser.json());
 app.use((req, res, next) => {
    "use strict";
    console.log("cors hit",req.method)
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === "OPTIONS") {


        return res.status(200).json({});


    } else {

        next();
    }
});

 app.use((req, res, next) => {
    "use strict";

    if (globals.getDatabase() === undefined) {

        globals.initDB().then(() => {
            next();
        }).catch((err) => {
            return false;
        });
    } else {
        next();
    }

 });

 // doesn't work in localhost
 // app.use(ddos.express); //---*
 // /** *****************************  AUTH MODULE FUNCTIONS *************************/
 //

 app.use("/",require("./modules/auth/login.js")(router)) // login
 //app.use("/",require("./modules/auth/refreshToken.js")(router))
 /** *****************************  USER MODULE FUNCTIONS *************************/
 app.use("/", require("./modules/user/createUser.js")(router)); // Create new user
 app.use("/",require("./modules/user/validUsername.js")(router));
 /** *****************************  GET MODULE FUNCTIONS *************************/
 app.use("/",require("./modules/token/checkEmailToken.js")(router));
 app.use("/",require("./modules/post/getPosts.js")(router));
 app.use("/",require("./modules/post/getPost.js")(router));
 /** *****************************  JWT MODULE FUNCTIONS *************************/
 app.use("/",require("./modules/auth/refreshToken.js")(router));
 app.use("/",require("./modules/auth/setPassword.js")(router));
 router.use(jwtToken.verifyJWT) // only for post
  /** *****************************  POST MODULE FUNCTIONS *************************/
 app.use("/",require('./modules/post/createPost.js')(router));


 module.exports = app
