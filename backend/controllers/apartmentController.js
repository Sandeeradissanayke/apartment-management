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

module.exports = {
    getAllApartments
};