// public method visible to all
// even the annoymous guys

const errors = require("../controllers/errorController");
const postModel = require("../models/post");



/*
Get all the related posts from the arg
@param {string} offset: gap between the start of the data
@param {string} size: size of the data as suggested by front-end
@returns {Promise}:
         - resolve : return all {JSON} posts
         - reject : returns error
*/
exports.getPosts = (state,city,category,subcategory,offset,size) =>{
    return new Promise((resolve,reject)=>{
      if((state || city) && (category || subcategory) && offset && size){
         postModel.getPostsFromDB(state,city,category,subcategory,parseInt(offset),parseInt(size)).then((data)=>{
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
         - resolve : returns particular {JSON} post
         - reject : rreturns error
*/

exports.getParticularPost = (id) =>{


    return new Promise((resolve,reject)=>{

      if(id){

         postModel.getPostParticularFromDB(id).then((data)=>{

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
