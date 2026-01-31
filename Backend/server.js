import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import heatmapRoutes from "./routes/heatmaproutes.js";
import plannerRoutes from "./routes/plannerRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/heatmap", heatmapRoutes);
app.use("/api/planner", plannerRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (_, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});