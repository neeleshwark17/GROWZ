const mongoose = require("mongoose");
const userInputSchema = new mongoose.Schema({
  goalId: {
    type: String,
    required: [true, "Enter goal Id"],
    unique: true,
    lowercase: true,
  },
  userId: {
    type: String,
    required: [true, "Enter user Id"],
    unique: true,
    lowercase: true,
  },
  config_user_entered: {
    update_bid_to: {
      type: String,
      required: true,
    },
  },
  // image: {
});

const UserInput = mongoose.model("userInput", userInputSchema);

module.exports = UserInput;
