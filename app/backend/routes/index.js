var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
const mainController = require("../controllers/mainController");
const GrowzConfig = require("../models/GrowzConfig");
const UserInput = require("../models/UserInput");
/* GET home page. */

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;

db.on("err", console.log.bind(console, "Connection Error"));
db.once("open", function () {
  console.log("BB CONNECTED");
});

router.get("/", mainController.home);

router.get("/amazon/getBid/:id", mainController.getBid);

// Create input in userinput table
router.post("/amazon/create", mainController.createUserInput);

// Create input in growz table
router.post("/amazon/create/growz", mainController.createGrowz);

// Update bid **************************
router.post("/amazon/update/bid", mainController.updateBid);

module.exports = router;
