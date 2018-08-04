// -------------------- DEFAULT ERRORS ------------------- //
exports.defaultDbError = { "code": 500, "msg": "DEFAULT_DB_ERROR" };
exports.paramMissing = { "code": 400, "msg": "Required params missing" };
exports.paramCorrupted = { "code": 400, "msg": "Required params corrupted" };
exports.invalidEmail = { "code": 400, "msg": "Invalid email format" };
exports.notFound = { "code": 404, "msg": "Not found" };
exports.cannotSendEmail = { "code": 500, "msg": "Cannot send email to user" };

// -------------------- AUTH ERRORS ------------------- //

exports.loginNotFound = { "code": 400, "msg": "Invalid username or password" };
exports.notAuthorized = { "code": 401, "msg": "User not authorized" };

// -------------------- USER ERRORS ------------------- //

exports.duplicateEmail = { "code": 400, "msg": "User with email exist" };
exports.duplicateUsername = { "code": 400, "msg": "User with username exist" };
exports.invalidLoginType = { "code": 400, "msg": "Invalid login type" };
exports.cannotCreatePassword = { "code": 500, "msg": "Password create failed" };
exports.userIsHost = { "code": 400, "msg": "User is host already" };

// -------------------- IMAGE ERRORS ------------------- //

exports.imageDownloadError = { "code": 500, "msg": "Cannot obtain image" };
exports.maxFileSize = { "code": 400, "msg": "Max file size is 1,5mb" };
exports.invalidMime = { "code": 400, "msg": "Invalid mime type" };

// -------------------- GEO ERRORS ------------------- //

exports.googleError = { "code": 500, "msg": "Cannt contact google service" };
exports.locationNotFound = { "code": 404, "msg": "Location not found" };

// -------------------- TICKETS ERRORS ------------------- //

exports.invalidTicketsCount = { "code": 400, "msg": "Requested ticket amount not available" };
exports.eventExpired = { "code": 500, "msg": "Event expired" };

// -------------------- PAYMENTS ERRORS ------------------- //

exports.duplicateStripeId = { "code": 400, "msg": "Stripe ID already exists" };
exports.stripeIdNotFound = { "code": 404, "msg": "Stripe ID not found" };
exports.stripeSourceError = { "code": 500, "msg": "Cannot attache source" };
