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
        response.status(code).json({"data": data, "error": error});
        response.send();
    } else {
        console.log("Headers set", data, error);
    }

    return true;
};

