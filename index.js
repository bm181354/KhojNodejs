/**
 * Created by interactivevision on 08/06/2017.
 */

const app = require("./server.js");
//TODO: - change port
// 'use strict':
app.listen(process.env.PORT || 5012, function(){
    "use strict";
    console.log("Is listening in PORT: 5012");
});
