const express = require("express");
const router = express.Router();

const {
    getAllApartments,
    createApartment
} = require("../controllers/apartmentController");

// Get all apartments
router.get("/", getAllApartments);

// Create new apartment
router.post("/", createApartment);

module.exports = router;