const supabase = require("../config/supabase");

/**
 * Fetch all air quality points for heatmap
 */
async function getAllAirQuality() {
    const { data, error } = await supabase
        .from("air_quality")
        .select("id, lat, lng, aqi, pm25, pm10");

    if (error) throw error;
    return data;
}

/**
 * Fetch high-risk air quality zones
 */
async function getHighRiskZones(threshold = 70) {
    const { data, error } = await supabase
        .from("air_quality")
        .select("*")
        .gte("risk_score", threshold);

    if (error) throw error;
    return data;
}

/**
 * Get nearest air quality point (used for area impact)
 */
async function getNearestAirQuality(lat, lng) {
    const { data, error } = await supabase.rpc(
        "get_nearest_air_quality",
        {
            lat_input: lat,
            lng_input: lng
        }
    );

    if (error) throw error;
    return data[0];
}

module.exports = {
    getAllAirQuality,
    getHighRiskZones,
    getNearestAirQuality
};