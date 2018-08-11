const assert = require("chai").assert;
const userModel = require("../models/user")

// beforeEach() -> setup()
describe("modelsUserUnitTest",function(){
   it("should print last name first",function(){
     assert.equal(userModel.nameCheck(),"Biken Maharjan");
   });
})
// afterEach() -> teardown()
