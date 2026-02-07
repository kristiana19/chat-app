import express from "express";
import authRouts from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

const PORT = process.env.PORT || 3000;

// __dirname za ESM (type: "module")
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// frontend/dist je u: project-root/frontend/dist
// a ovaj fajl je u: project-root/backend/src/index.js
const distPath = path.resolve(__dirname, "..", "..", "frontend", "dist");

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouts);
app.use("/api/messages", messageRoutes);

// ✅ Serviraj frontend samo ako postoji build (radi i bez NODE_ENV)
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // Express 5-safe fallback za SPA
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  console.log("Serving frontend from:", distPath);
} else {
  console.log("Frontend dist not found, skipping static serve. Looked at:", distPath);
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
