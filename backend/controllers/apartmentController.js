const Apartment = require("../models/Apartment");
const mongoose = require("mongoose");

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

// Get apartment by ID
const getApartmentById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid apartment ID"
            });
        }

        const apartment = await Apartment.findById(id);

        if (!apartment) {
            return res.status(404).json({
                message: "Apartment not found"
            });
        }

        res.json(apartment);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAllApartments,
    createApartment,
    getApartmentById
};