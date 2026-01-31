const express = require("express");
const router = express.Router();

const {
    highRiskZones,
    areaImpact,
    policySimulation
} = require("../controllers/plannerController");

// PUBLIC ROUTES — NO AUTH
router.get("/risk", highRiskZones);
router.post("/impact", areaImpact);
router.post("/policy", policySimulation);

module.exports = router;
