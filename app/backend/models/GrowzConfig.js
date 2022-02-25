const mongoose = require("mongoose");
const growzConfigSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: [true, "id should be unique"],
    lowercase: true,
  },
  name: {
    type: String,
    lowercase: true,
  },
  description: {
    type: String,
    lowercase: true,
  },
  config_user_has_to_input: {
    update_bid_to: {
      type: String,
      required: [true, "Required input"],
      lowercase: true,
    },
  },
  config_type: {
    update_bid_to: {
      type: String,
      required: [true, "Required type"],
      lowercase: true,
    },
  },
  // image: {
});

const GrowzConfig = mongoose.model("growzConfig", growzConfigSchema);

module.exports = GrowzConfig;
