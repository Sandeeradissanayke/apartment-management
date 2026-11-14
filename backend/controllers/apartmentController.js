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

        const apartment = await Apartment.findById(id);

        if (!apartment) {
            return res.status(404).json({
                message: "Apartment not found"
            });
        }

        const {
            apartmentNumber,
            bedroomType,
            status,
            bookingFrom,
            bookingTo
        } = req.body;

        if (apartmentNumber !== undefined) {
            apartment.apartmentNumber = apartmentNumber;
        }

        if (bedroomType !== undefined) {
            apartment.bedroomType = bedroomType;
        }

        // Make apartment available
        if (status === "Available") {
            apartment.status = "Available";
            apartment.bookingFrom = null;
            apartment.bookingTo = null;
        }

        // Update booking dates
        else if (
            status === "Booked" ||
            bookingFrom !== undefined ||
            bookingTo !== undefined
        ) {
            const fromDate = bookingFrom !== undefined
                ? new Date(bookingFrom)
                : apartment.bookingFrom;

            const toDate = bookingTo !== undefined
                ? new Date(bookingTo)
                : apartment.bookingTo;

            if (!fromDate || !toDate) {
                return res.status(400).json({
                    message: "Both booking dates are required"
                });
            }

            if (
                Number.isNaN(fromDate.getTime()) ||
                Number.isNaN(toDate.getTime())
            ) {
                return res.status(400).json({
                    message: "Invalid booking dates"
                });
            }

            if (fromDate > toDate) {
                return res.status(400).json({
                    message: "From date cannot be after To date"
                });
            }

            apartment.bookingFrom = fromDate;
            apartment.bookingTo = toDate;
            apartment.status = "Booked";
        }

        else if (status !== undefined) {
            apartment.status = status;
        }

        await apartment.save();

        res.json(apartment);

    } catch (error) {
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