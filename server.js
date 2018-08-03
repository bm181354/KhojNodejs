/**
 * Created by bikenMaharjan<bikenm.us> on 08/03/2018.
 */
 
 const express = require("express")
 app = express()
 router = express.Router()
 
 
 /** *****************************  AUTH MODULE FUNCTIONS *************************/
 app.use("/",require("./modules/auth/login.js")(router)) // login
 
 
 module.export = app