const router = require("express").Router();
const {
    airQualityHeatmap,
    diseaseHeatmap,
    riskHeatmap
} = require("../controllers/heatmapController.js");

router.get("/air", airQualityHeatmap);
router.get("/disease", diseaseHeatmap);
router.get("/risk", riskHeatmap);

module.exports = router;


// import express from "express";
// import { getHeatmapRisk } from "../controllers/heatmapController.js";


router.get("/risk", getHeatmapRisk);

export default router;