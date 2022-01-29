const expressJwt = require("express-jwt");
require("dotenv").config();

// user must be signed in
exports.requireSignIn = expressJwt({
  secret: process.env.SECRETKEY,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// check if the requested profile same as the signed in user
exports.isAuth = (req, res, next) => {
  if (req.auth.role == 1) {
    return next();
  }

  let user = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }

  next();
};
