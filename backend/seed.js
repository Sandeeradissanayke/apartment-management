
require("dotenv").config();

const mongoose = require("mongoose");
const Apartment = require("./models/Apartment");

async function seedApartments() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    const existingApartments = await Apartment.countDocuments();

    if (existingApartments > 0) {
      console.log("Apartments already exist. Skipping seed.");
      return;
    }

    const apartments = [];

    // Create 7 two-bedroom apartments
    for (let i = 1; i <= 7; i++) {
      apartments.push({
        apartmentNumber: `A0${i}`,
        bedroomType: "2 Bedroom",
        status: "Available"
      });
    }

    // Create 3 one-bedroom apartments
    for (let i = 1; i <= 3; i++) {
      apartments.push({
        apartmentNumber: `B0${i}`,
        bedroomType: "1 Bedroom",
        status: "Available"
      });
    }

    await Apartment.insertMany(apartments);

    console.log("10 apartments added successfully!");

  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
}

seedApartments();
