const express = require("express");

// Import controllers
const {
  signup,
  signin,
  signout,
  hello,
} = require("../controllers/authController");

// Import Middlwares
const { userSignUpValidatore } = require("../middlewares/userValidatore");
const { requireSignIn } = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", userSignUpValidatore, signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.get("/hello", requireSignIn, hello);

module.exports = router;
