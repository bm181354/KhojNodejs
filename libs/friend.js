// public method visible to all
// even the annoymous guys
const errors = require("../controllers/errorController");
const postModel = require("../models/post");


exports.getPost = (state,location,category,subcategory) =>{
    return new Promise((resolve,reject)=>{
      if(state && location && category && subcategory){
        // query here
        //TODO: put data inside the resolve
        //req.query.state,req.query.city,param.category,param.subcategory
         //state,city,category,subcategory
         //"MA",null,"IT",null
         postModel.getPostDB(state,city,category,subcategory).then((data)=>{
            resolve(data)
         }).catch((err)=>{
            reject(err)
         })
      }else{
        //TODO:remove this and comment
        postModel.getPostDB(state,location,category,subcategory).then((data)=>{
           resolve(data)
        }).catch((err)=>{
           reject(err)
        })
        //reject(errors.paramMissing)
      }
    })
}


exports.getParticularPost = (id) =>{
    return new Promise((resolve,reject)=>{
      if(id){
        // query here
        //TODO: put data inside the resolve
        //req.query.state,req.query.city,param.category,param.subcategory
         //state,city,category,subcategory
         //"MA",null,"IT",null
         postModel.getPostParticularDB(id).then((data)=>{
            resolve(data)
         }).catch((err)=>{
            reject(err)
         })
      }else{
        //TODO:remove this and comment
        postModel.getPostParticularDB(id).then((data)=>{
           resolve(data)
        }).catch((err)=>{
           reject(err)
        })
        //reject(errors.paramMissing)
      }
    })
}
