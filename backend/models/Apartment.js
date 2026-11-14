
const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
  apartmentNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
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
  },

  bookingFrom: {
    type: Date,
    default: null
  },

  bookingTo: {
    type: Date,
    default: null
  }

}, { timestamps: true });

module.exports = mongoose.model("Apartment", apartmentSchema);
