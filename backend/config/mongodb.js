import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database Connected"))

    // Use environment variable or fallback to local MongoDB
    let mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017";

    // Clean up the connection string - remove any trailing semicolons
    mongoURI = mongoURI.replace(/;$/, '');

    // For MongoDB Atlas, use the connection string as is
    // For local MongoDB, append the database name
    let fullURI;
    if (mongoURI.includes('mongodb+srv://')) {
        // MongoDB Atlas connection string - use as is
        fullURI = mongoURI;
    } else {
        // Local MongoDB - append database name
        fullURI = mongoURI.endsWith('/prescripto') ? mongoURI : `${mongoURI}/prescripto`;
    }

    console.log("Attempting to connect to MongoDB with URI:", fullURI);

    try {
        await mongoose.connect(fullURI);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        throw error;
    }
}

export default connectDB;