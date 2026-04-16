const mongoose = require("mongoose");

const mongoURI = process.env.mongo_URI;

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to Mongotetcha successfully");
    }).catch((err) => {
        console.error("MongoDB connection error:", err);
    });
};

module.exports = connectToMongo;