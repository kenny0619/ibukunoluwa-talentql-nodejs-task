const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const connectDB = require("./config/db");

require("dotenv").config({ path: "./config/config.env" });

//mount db
connectDB();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookie parser
app.use(cookieParser());

// index route display
app.use(express.static(path.join(__dirname, "public")));

//mount routes
app.use(require("./src/routes"));

// mount middleware functions
app.use(require("./src/middlewares/error.middleware"));

//export app to server @./bin/www
module.exports = app;
