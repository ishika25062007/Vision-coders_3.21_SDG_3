const mongoose = require("mongoose");

const airQualitySchema = new mongoose.Schema({
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: [Number]
    },
    pm25: Number,
    pm10: Number,
    no2: Number,
    so2: Number,
    co: Number,
    o3: Number,
    aqi: Number,
    city: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

airQualitySchema.index({ location: "2dsphere" });

module.exports = mongoose.model("AirQuality", airQualitySchema);