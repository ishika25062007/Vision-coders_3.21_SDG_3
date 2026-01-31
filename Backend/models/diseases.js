const supabase = require("../config/supabase");

/**
 * Get disease statistics by area
 */
async function getDiseaseStatsByArea(area) {
    const { data, error } = await supabase
        .from("respiratory_diseases")
        .select("*")
        .eq("area", area);

    if (error) throw error;
    return data;
}

/**
 * Correlate AQI with disease increase
 */
async function getDiseaseImpactByAQI(aqi) {
    const { data, error } = await supabase
        .from("disease_impact")
        .select("*")
        .lte("min_aqi", aqi)
        .gte("max_aqi", aqi);

    if (error) throw error;
    return data[0];
}

/**
 * Fetch disease trends for dashboard charts
 */
async function getDiseaseTrends() {
    const { data, error } = await supabase
        .from("respiratory_diseases")

    if (error) throw error;
    return data;
}

module.exports = {
    getDiseaseStatsByArea,
    getDiseaseImpactByAQI,
    getDiseaseTrends
};