const supabase = require("../config/supabase");

exports.airQualityHeatmap = async (req, res) => {
    const { data, error } = await supabase
        .from("air_quality")
        .select("aqi, location");

    if (error) return res.status(500).json(error);

    res.json(
        data.map(d => ({
            lat: d.location.coordinates[1],
            lng: d.location.coordinates[0],
            value: d.aqi
        }))
    );
};

exports.diseaseHeatmap = async (req, res) => {
    const { data, error } = await supabase
        .from("disease_data")
        .select("asthma, copd, bronchitis, location");

    if (error) return res.status(500).json(error);

    res.json(
        data.map(d => ({
            lat: d.location.coordinates[1],
            lng: d.location.coordinates[0],
            value: d.asthma + d.copd + d.bronchitis
        }))
    );
};

exports.riskHeatmap = async (req, res) => {
    const { data, error } = await supabase
        .from("risk_index")
        .select("risk_score, risk_level, location");

    if (error) return res.status(500).json(error);

    res.json(
        data.map(r => ({
            lat: r.location.coordinates[1],
            lng: r.location.coordinates[0],
            value: r.risk_score,
            level: r.risk_level
        }))
    );
};