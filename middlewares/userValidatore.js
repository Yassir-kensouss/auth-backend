const User = require("../models/user");

exports.userSignUpValidatore = (req, res, next) => {
  req.check("name", "Name is required").notEmpty();
  req
    .check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email");
  req
    .check("password")
    .notEmpty()
    .isLength({ min: 6, max: 10 })
    .withMessage("password must be between 6 and 10");

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).json(errors);
  }

  next();
};
