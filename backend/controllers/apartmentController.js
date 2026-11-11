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

        if (!apartmentNumber || !bedroomType) {
    return res.status(400).json({
        message: "Apartment number and bedroom type are required"
    });
}

        const apartment = await Apartment.create({
            apartmentNumber,
            bedroomType
        });

        res.status(201).json(apartment);

    } catch (error) {

    // Duplicate apartment number
    if (error.code === 11000) {
        return res.status(409).json({
            message: "Apartment number already exists"
        });
    }

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

// Update apartment
const updateApartment = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid apartment ID"
            });
        }

        const { apartmentNumber, bedroomType, status } = req.body;

        const updateData = {};

        if (apartmentNumber !== undefined) {
            updateData.apartmentNumber = apartmentNumber;
        }

        if (bedroomType !== undefined) {
            updateData.bedroomType = bedroomType;
        }

        if (status !== undefined) {
            updateData.status = status;
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "No update data provided"
            });
        }

        const apartment = await Apartment.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

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

// Delete apartment
const deleteApartment = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid apartment ID"
            });
        }

        const apartment = await Apartment.findByIdAndDelete(id);

        if (!apartment) {
            return res.status(404).json({
                message: "Apartment not found"
            });
        }

        res.json({
            message: "Apartment deleted successfully",
            apartment
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAllApartments,
    createApartment,
    getApartmentById,
    updateApartment,
    deleteApartment
};