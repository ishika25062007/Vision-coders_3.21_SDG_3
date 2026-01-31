const supabase = require("../config/supabase");



const AirQuality = require("../models/airquality");
const Disease = require("../models/disease");

exports.highRiskZones = async (req, res) => {
    try {
        const zones = await AirQuality.getHighRiskZones(70);
        res.json(zones);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.highRiskZones = async (req, res) => {
    const { data, error } = await supabase
        .from("risk_index")
        .select("*")
        .gte("risk_score", 70);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};

exports.areaImpact = async (req, res) => {
    const { lat, lng } = req.body;

    if (!lat || !lng) {
        return res.status(400).json({ msg: "lat and lng required" });
    }

    const { data, error } = await supabase.rpc(
        "get_nearest_risk_zone",
        { lat_input: lat, lng_input: lng }
    );

    if (error || !data || data.length === 0) {
        return res.json({ msg: "No data found" });
    }

    const zone = data[0];

    res.json({
        aqi: zone.aqi,
        riskLevel: zone.risk_level,
        estimatedRespiratoryIncrease:
            zone.risk_score > 80 ? "30%" :
                zone.risk_score > 60 ? "20%" : "10%"
    });
};

exports.policySimulation = async (req, res) => {
    const { policy } = req.body;

    const effects = {
        "odd-even": 18,
        "green-buffer": 25,
        "industrial-restriction": 35
    };

    const reduction = effects[policy] || 10;

    res.json({
        expectedAQIReduction: `${reduction}%`,
        expectedHealthImprovement: `${Math.round(reduction * 0.7)}%`
    });
};
