const  jwt = require('jsonwebtoken'),
        config = require("../config/config"),
        errors = require("../controllers/errorController");


exports.verifyJWT = (req,res,next) =>{
    try{
      if(req.headers["authorization"]){
        var token = req.headers["authorization"].split(" ");
        jwt.verify(token[1], config.CERT, function(err, decoded) {
              console.log("DECODED",decoded)
              if(err){
                //console.log(err);
                res.status(400).json({"data": [], "error": err});
                res.send();
              }else{
                if(decoded.type === "access"){
                  req.data = decoded;
                  console.log("DECODED",decoded)
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
      res.status(err.code).json({"data": [], "error": err});
      res.send();
    }
}

// FOR validate purpose
exports.verifyAccessToken = (refreshToken) =>{
  return jwt.verify(refreshToken, config.CERT, function(err, decoded) {
        console.log("DECODED",decoded)
        if(err){
          return {id:null,isSuccess:false}
        }
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
