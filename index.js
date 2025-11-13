// index.js
console.log("[BOOT] GoT House Quiz API starting…");

import "dotenv/config";
import express from "express";
import { registerGotRoutes } from "./got/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(express.json());

// Simple health check / root route
app.get("/", (_req, res) => {
  res
    .type("text/plain")
    .send("Game of Thrones House Quiz API is online. Use /got/start and /got/answer.");
});

// Register all GoT quiz HTTP routes
registerGotRoutes(app);

// Start server
app.listen(PORT, () => {
  console.log(`[BOOT] Listening on port ${PORT}`);
});



