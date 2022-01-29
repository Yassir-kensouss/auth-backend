const express = require("express");

// Import Controller
const { getOneUser } = require("../controllers/userController");

// Import Middlware
const { userById } = require("../middlewares/user");
const { requireSignIn, isAuth } = require("../middlewares/auth");

const router = express.Router();

router.get("/profile/:userId", requireSignIn, isAuth, getOneUser);
router.param("userId", userById);

module.exports = router;
