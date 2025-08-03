const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/Helper";

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