import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

// Serve client build in production
if (process.env.NODE_ENV === "production") {
  const clientDistPath = path.join(__dirname, "..", "..", "client", "dist");
  app.use(express.static(clientDistPath));
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

const PORT = Number(process.env.PORT) || 5050;

async function start() {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("Mongo connected");
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
