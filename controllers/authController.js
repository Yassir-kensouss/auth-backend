const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Sign up logic
exports.signup = (req, res) => {
  const user = new User(req.body);

  user.save((err, user) => {
    if (err) {
      // check email uniqness
      if (err.name === "MongoError" && err.code === 11000) {
        return res.status(400).send("Email already in use");
      } else {
        return res.status(400).send(err);
      }
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.send(user);
  });
};

// Sign In logic
exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User Not Found With Email, Please Sign Up",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Password and Email Dont Match",
      });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.SECRETKEY
    );

    res.cookie("token", token, { expire: new Date() + 793923723 });

    const { _id, first_name, last_name, email, role } = user;

    res.json({
      token,
      user: { _id, first_name, last_name, email, role },
    });
  });
};

// Sign out

exports.signout = (req, res) => {
  res.clearCookie("token");

  res.json({
    message: "User Signed out",
  });
};

exports.hello = (req, res) => {
  res.send("hello user");
};
