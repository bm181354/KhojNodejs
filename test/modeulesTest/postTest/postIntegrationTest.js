//

const request = require("supertest"),
      expect = require('chai').expect,
      rewire = require('rewire'),
      config = require('../../../config/config.js'),
      app = rewire('../../../server.js');
/*
    /MARK:- Valid access Token related test
    TEST : post("/api/v1/createpost")
    +create data with valid Access Token
*/
describe("$CreatePost", function(){

  // runs before every test (it)
  // setup in javascript analogous
         beforeEach(function(){
           // this token will expire in 3hr so be careful
           this.Accesstoken = config.FAKE_ACCESSTOKEN_TEST
            this.userData = {
               "description":"This is a check",
                "title":"title check",
                "category": "job",
                "subcategory": "IT",
                "country":"US",
                "city":"Revere",
                "state":"MA"
               }
            this.skip();

         });

        it("create data with valid Access Token",function(done){
          // async so test mocha when it ends --> using end
          request(app)
              .post("/api/v1/createpost")
              .set('Authorization', 'Bearer ' + this.Accesstoken)
              .send(this.userData)
              .expect(200)
              .end(done);
        });


        afterEach(function(){
          delete this.Accesstoken;
          delete this.userData;
        })
})
//(************************************************************************)
describe("$GET post data from database", function(done){
      beforeEach(function(){
          // this.skip();
          this.params ={ state: 'MA', city:'Revere'}
          this.skip();
      })

      it("Get Post data WITH ID as 14", function(done){
         request(app)
            .get("/api/v1/post/14")
            .expect(200)
            .end(done);
      })

      it("Get Posts data with different param and query", function(done){
         request(app)
            .get("/api/v1/posts/job/IT")
            .query(this.params)
            .expect(200)
            .end(done);
      })

      afterEach(function(){

      })

})
//(************************************************************************)
//MARK:- Token related checks
describe("$NO Token check", function(done){
  "use strict";

  beforeEach(function(){
    // this code expire so be careful
     this.accessToken = config.FAKE_ACCESSTOKEN_TEST
     this.refreshToken = config.FAKE_REFRESHTOKEN_TEST
     this.userData = {
        "description":"This is a check",
         "title":"title check",
         "category": "job",
         "subcategory": "IT",
         "country":"US",
         "city":"Revere",
         "state":"MA"
        }


  });

 it("Failed to create post with NO TOKEN",function(done){
   // async so test mocha when it ends --> using end
   request(app)
       .post("/api/v1/createpost")
       .send(this.userData)
       .expect(400)
       .end(done);
 });

 it("Failed to create post with wrong TOKEN",function(done){
   // async so test mocha when it ends --> using end
   request(app)
       .post("/api/v1/createpost")
       .send(this.userData)
       .set('Authorization', 'Bearer ' + this.refreshToken)
       .expect(400)
       .end(done);
 });


  afterEach(function(){
    delete this.userData;
    delete this.accessToken;
    delete this.refreshToken;
  })

})
