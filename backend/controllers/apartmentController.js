const Apartment = require("../models/Apartment");

// Get all apartments
const getAllApartments = async (req, res) => {
    try {
        const apartments = await Apartment.find();
        res.json(apartments);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Create new apartment
const createApartment = async (req, res) => {
    try {
        const { apartmentNumber, bedroomType } = req.body;

        const apartment = await Apartment.create({
            apartmentNumber,
            bedroomType
        });

        res.status(201).json(apartment);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAllApartments,
    createApartment
};