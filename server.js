/**
 * Created by bikenMaharjan<bikenm.us> on 08/03/2018.
 */

 const express = require("express");
 const globals = require("./config/globals");
 //const Ddos = require('ddos');  ---*
/* For testing purpose remove the code
*  resets every seconds
*/
 //var ddos = new Ddos({burst:10, limit:15}) //---*
 var app = express();


 let bodyParser = require("body-parser");
 router = express.Router();


app.use(bodyParser.json());
 app.use((req, res, next) => {
    "use strict";

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
});
 app.use((req, res, next) => {
    "use strict";

    if (globals.getDatabase() === undefined) {

        globals.initDB().then(() => {
            console.log("Database init")
            next();
        }).catch((err) => {
            console.log(err);
            //apiResponse(res, null, errors.defaultDbError, errors.defaultDbError.code);
            console.log("Database can't be init")
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

 /** *****************************  USER MODULE FUNCTIONS *************************/

app.use("/", require("./modules/user/createUser.js")(router)); // Create new user


 module.exports = app
