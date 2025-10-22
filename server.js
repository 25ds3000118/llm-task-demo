import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const SECRET = "LLM-DEPLOYMENT-2025";

app.post("/api-endpoint", (req, res) => {
  console.log("📩 Incoming request:", req.body);

  if (req.body.secret !== SECRET) {
    console.log("❌ Invalid secret:", req.body.secret);
    return res.status(403).json({ error: "Forbidden: Invalid secret" });
  }

  console.log("✅ Secret matched");

  res.json({
    success: true,
    message: "Secret verified successfully. Assignment running as expected.",
  });
});

// Fix for Express 5 — use regex instead of '*'
app.options(/.*/, (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(200);
});

// Catch-all for other random endpoints
app.all(/.*/, (req, res) => {
  console.log(`⚠️ Unhandled ${req.method} request to ${req.path}`);
  res.status(404).json({ error: "Not Found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
