
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

    const apartments = [
      {
        apartmentNumber: "UK Ground Floor 01",
        bedroomType: "2 Bedroom",
        status: "Booked"
      },
      {
        apartmentNumber: "UK Ground Floor 02",
        bedroomType: "2 Bedroom",
        status: "Booked"
      },
      {
        apartmentNumber: "UK First Floor 01",
        bedroomType: "2 Bedroom",
        status: "Booked"
      },
      {
        apartmentNumber: "UK First Floor 02",
        bedroomType: "2 Bedroom",
        status: "Available"
      },
      {
        apartmentNumber: "Wattala Ground Floor",
        bedroomType: "2 Bedroom",
        status: "Available"
      },
      {
        apartmentNumber: "Wattala First Floor",
        bedroomType: "2 Bedroom",
        status: "Booked"
      },
      {
        apartmentNumber: "Wattala Second Floor",
        bedroomType: "2 Bedroom",
        status: "Booked"
      },
      {
        apartmentNumber: "Wattala Suite 01",
        bedroomType: "1 Bedroom",
        status: "Available"
      },
      {
        apartmentNumber: "Wattala Suite 02",
        bedroomType: "1 Bedroom",
        status: "Available"
      },
      {
        apartmentNumber: "Wattala Attick",
        bedroomType: "1 Bedroom",
        status: "Available"
      }
    ];

    await Apartment.insertMany(apartments);

    console.log("10 apartments added successfully!");

  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
}

seedApartments();
