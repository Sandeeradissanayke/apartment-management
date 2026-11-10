const express = require("express");
const router = express.Router();

const {
    getAllApartments,
    createApartment,
    getApartmentById
} = require("../controllers/apartmentController");

// Get all apartments
router.get("/", getAllApartments);

// Create new apartment
router.post("/", createApartment);

// Get apartment by ID
router.get("/:id", getApartmentById);

module.exports = router;