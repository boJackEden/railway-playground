// ================================
// 🔴 PROCESS-LEVEL DEBUG HANDLERS
// ================================
process.on("exit", (code) => {
  console.log("🛑 process exit event. code =", code);
});

process.on("beforeExit", (code) => {
  console.log("🟡 beforeExit event. code =", code);
});

process.on("uncaughtException", (err) => {
  console.error("❌ uncaughtException", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("❌ unhandledRejection", reason);
});

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth";

// if I am deploying then don't use the dotenv config I have (idiot check)
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
const app = express();

app.get("/api/health", (_req, res, next) => {
  console.log('THE HEALTH CHECK IS BEING CALLED');
  res.status(200).send("ok");
  next();
});

app.use(express.json());


// API routes
app.use("/api/auth", authRoutes);

// Serve client build in production
// if (process.env.NODE_ENV === "production") {
//   const clientDistPath = path.join(__dirname, "..", "..", "client", "dist");
//   app.use(express.static(clientDistPath));
//   console.log('CLIENT BUILD PATH', clientDistPath)
//   app.get(/^(?!\/api).*/, (_req, res) => {
//     console.log('IS THIS SERVING ANTYHING OR causing my app to crash?')
//     res.sendFile(path.join(clientDistPath, "index.html"));
//   });
// }

const PORT = Number(process.env.PORT) || 5050;
console.log("BOOT NODE_ENV:", process.env.NODE_ENV);
console.log("BOOT process.env.PORT:", process.env.PORT);

app.listen(PORT, "0.0.0.0", () => {
  console.log("LISTENING ON:", PORT);
});

// Connect AFTER listening so Railway can reach your service
// mongoose
//   .connect(process.env.MONGO_URI as string, {
//     serverSelectionTimeoutMS: 10_000, // fail fast rather than hanging forever
//   })
//   .then(() => console.log("Mongo connected"))
//   .catch((err) => console.error("Mongo connect error:", err));