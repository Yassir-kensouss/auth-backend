const express = require("express");
const mongoose = require("mongoose");
const expressValidatore = require("express-validator");
const cookieParser = require("cookie-parser");

// ** Import Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

//** Config app
const app = express();
require("dotenv").config();

//** Conneting Database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"))
  .catch(() => console.log("not connect to the database !"));

// ** Middlware
app.use(express.json());
app.use(cookieParser());
app.use(expressValidatore());

// ** Routes middlware
app.use("/api", authRoutes);
app.use("/api", userRoutes);

//** db Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app is running on port ${port}`));
