const mongoose = require("mongoose");

const { Schema } = mongoose;

const clientModel = new Schema({
  id: { type: String },
  name: { type: String },
  email: { type: String },
  role: { type: String },
});

module.exports = mongoose.model("Client", clientModel);
