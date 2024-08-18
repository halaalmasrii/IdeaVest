const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  packagesId: {
    type: String,
    required: true,
  },
  packagetype: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
});
const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
