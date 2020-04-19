const mongoose = require("mongoose");

const { Schema } = mongoose;

const policieModel = new Schema({
  id: { type: String },
  amountInsured: { type: Number },
  email: { type: String },
  inceptionDate: { type: String },
  installmentPayment: { type: Boolean },
  iclientId: { type: String },
});

module.exports = mongoose.model("Client", policieModel);
