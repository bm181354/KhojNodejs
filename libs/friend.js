// public method visible to all
// even the annoymous guys
const errors = require("../controllers/errorController");
const postModel = require("../models/post");


exports.getPost = (state,city,category,subcategory,offset,size) =>{
    return new Promise((resolve,reject)=>{
      if((state || city) && (category || subcategory) && offset && size){
        console.log("CHECK")
         postModel.getPostDB(state,city,category,subcategory,parseInt(offset),parseInt(size)).then((data)=>{
           console.log(state,city,category,subcategory,parseInt(offset),parseInt(size))
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
             return reject(errors.notFound)
           }else{
            return resolve(data)
          }
         }).catch((err)=>{
            return reject(err)
         })
      }else{
        return reject(errors.paramMissing)
      }
    })
}
