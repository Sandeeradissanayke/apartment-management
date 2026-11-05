
const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
  apartmentNumber: {
    type: String,
    required: true,
    unique: true
  },

  bedroomType: {
    type: String,
    required: true,
    enum: ["2 Bedroom", "1 Bedroom"]
  },

  status: {
    type: String,
    enum: ["Available", "Booked"],
    default: "Available"
  }

}, { timestamps: true });

module.exports = mongoose.model("Apartment", apartmentSchema);
