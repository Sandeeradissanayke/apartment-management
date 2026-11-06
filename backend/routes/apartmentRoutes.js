const express = require("express");
const router = express.Router();

const {
    getAllApartments
} = require("../controllers/apartmentController");

// Get all apartments
router.get("/", getAllApartments);

module.exports = router;