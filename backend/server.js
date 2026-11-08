const express = require("express");
const cors = require("cors");
const path = require("path");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

require("dotenv").config({
    path: path.join(__dirname, ".env")
});

const connectDB = require("./config/db");
const apartmentRoutes = require("./routes/apartmentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
    res.send("Apartment Management API is running");
});

// Apartment routes
app.use("/api/apartments", apartmentRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});