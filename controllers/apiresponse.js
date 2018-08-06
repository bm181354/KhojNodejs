/*
  File : all response will be directed through this
*/
module.exports = (response, data, error, code) => {
    "use strict";
    if (!response.headersSent) {
        console.log("resErr", error);
        console.log("resData", data);
        error = error || null;
        code = code || 200;
        if (code > 505) {
            code = 500;
        }
        // "malformed query"
        console.log(code)
        if (typeof code === "string"){
           response.status(503).json({"data": data, "error": "malformed query"});
           response.send();
        }else{
           response.status(code).json({"data": data, "error": error});
           response.send();
      }
    } else {
        console.log("Headers set", data, error);
    }

    return true;
};
