// public method visible to all
// even the annoymous guys
const errors = require("../controllers/errorController");
const postModel = require("../models/post");


exports.getPost = (state,city,category,subcategory) =>{
    return new Promise((resolve,reject)=>{
      if((state || city) && (category || subcategory)){
         postModel.getPostDB(state,city,category,subcategory).then((data)=>{
           if((data.length) < 1){
             reject(errors.notFound)
           }
            resolve(data)
         }).catch((err)=>{
            reject(err)
         })
      }else{
        reject(errors.paramMissing)
      }
    })
}

/*
Get the particular post from the id
@param {integer} id -  post id
@returns {Promise}:
         - resolve : returns data
         - reject : rreturns error
*/

exports.getParticularPost = (id) =>{
    return new Promise((resolve,reject)=>{
      if(id){
         postModel.getPostParticularDB(id).then((data)=>{

           if((data.length) < 1){
             reject(errors.notFound)
           }
            resolve(data)
         }).catch((err)=>{
            reject(err)
         })
      }else{
        // //TODO:remove this and comment
        // postModel.getPostParticularDB(id).then((data)=>{
        //    resolve(data)
        // }).catch((err)=>{
        //    reject(err)
        // })
        reject(errors.paramMissing)
      }
    })
}
