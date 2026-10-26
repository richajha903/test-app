const mongoose = require("mongoose");

const mongodbUrl =
    process.env.MONGODB_URL || "mongodb://localhost:27017/QUIZ";

const connectDB = async () => {
    try {
        await mongoose.connect(mongodbUrl);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;