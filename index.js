/**
 * Created by interactivevision on 08/06/2017.
 */

const app = require("./server.js");

//TODO: - change port 
// 'use strict': 
app.listen(process.env.PORT || 3000, () => {
    "use strict";
    console.log(process.env.PORT);
});
