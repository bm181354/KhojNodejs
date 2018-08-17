const  jwt = require('jsonwebtoken'),
        config = require("../config/config"),
        authModel = require("../models/auth"),
        userModel = require("../models/user"),
        errors = require("../controllers/errorController");



// expires in 15 minutes
// doesn't go into database
// for 301 error
//TODO:- check for validity of refreshToken and id
// refreshToken body should consists of id
exports.createNewAccessToken = (req) => {
  "use strict";
  // get refreshToken from userID
  // create new JWT and send to the user
  return new Promise((resolve,reject) => {
    try{
      console.log(req.headers["authorization"])
      if(typeof(req.headers["authorization"]) !== "undefined" && req.headers["authorization"]){
        const token = req.headers["authorization"].split(" ");
             var {id,isSuccess} = this.verifyAccessToken(token[1])
             console.log(isSuccess)
             if(isSuccess){
               console.log("createAccessToken:Success")
                authModel.createRefreshToken(id,null).then(({data,refreshToken})=>{
                  userModel.updateRefreshToken(refreshToken,id).then((newCheck)=>{
                          resolve({data,refreshToken})
                      }).catch((err)=>{
                          reject(error.defaultDbError)
                      })
                }).catch((err)=>{
                  reject(error.defaultDbError)
                })
             }else{
                console.log("createAccessToken:fail")
                reject(error.accessTokenGenerationError)
             }

        }else{
          reject(error.notAuthorized)
        }

    }catch (err){
      console.log("also",err)
      reject(error.accessTokenGenerationError)
    }
  })
}

exports.verifyJWT = (req,res,next) =>{
    try{
      console.log("tokenBeforeDecoded",typeof(req.headers["authorization"]))
      if(typeof(req.headers["authorization"]) !== "undefined" && req.headers["authorization"]){
        const token = req.headers["authorization"].split(" ");
        jwt.verify(token[1], config.CERT, function(err, decoded) {
              if(err){
                res.status(401).json({"data": [], "error": err});
                res.send();
              }else{
                if(decoded.type === "access"){
                  req.data = decoded;
                  next();
                }else{
                  res.status(400).json({"data": [], "error": "Bad/Wrong token used"});
                  res.send();
                }
              }
          });
      }else{
        res.status(400).json({"data": [], "error": "Missing access Token"});
        res.send();
      }
    }catch(err){
      res.status(400).json({"data": [], "error": "Bad request"});
      res.send();
    }
}

// FOR validate purpose
// Actual should be verifyRefreshToken
exports.verifyAccessToken = (refreshToken) =>{

  return jwt.verify(refreshToken, config.CERT, function(err, decoded) {

        if(err){
          console.log(err,refreshToken)
          console.log("verifyAccessToken")
          return {id:null,isSuccess:false}
        }
        console.log("DECODED",decoded)
        if(decoded.type === "master"){
           console.log("DECODED",1)
           return {id:decoded.id,isSuccess:true}
        }else{
            console.log("DECODED",4)
            return {id:decoded.id,isSuccess:false}
        }
    });
}


// raw decoded data
exports.decodeJWT = (token) =>{
  return new Promise((resolve,reject)=>{
    jwt.verify(token, config.CERT, function(err, decoded) {
        if(err){
          reject(err)
        }
        resolve(decode)
    });
  })
}
