const User = require("../models/user");

exports.userSignUpValidatore = (req, res, next) => {
  req.check("first_name", "First Name is required").notEmpty();
  req.check("last_name", "Last Name is required").notEmpty();
  req
    .check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email");
  req
    .check("password", "Password Required")
    .notEmpty()
    .isLength({ min: 6, max: 10 })
    .withMessage("password must be between 6 and 10");

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).json({ error: errors[0].msg });
  }

  next();
};
