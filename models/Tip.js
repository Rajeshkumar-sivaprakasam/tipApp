const mongoose = require("mongoose");

const TipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  tipAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tip", TipSchema);
