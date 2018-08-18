const assert = require("chai").assert;
const rewire = require('rewire');
const userModel = rewire("../../models/user")


// beforeEach() -> setup()
describe("$modelsUserUnitTest",function(){
   it("should print last name first",function(){
     assert.equal(userModel.nameCheck(),"Biken Maharjan");
   });
})
// afterEach() -> teardown()
