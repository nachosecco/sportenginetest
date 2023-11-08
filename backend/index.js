import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import generationRoutes from './routes/generationRoutes.js'
import lineUpRoutes from './routes/lineUpRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json()); // procesamos json info

dotenv.config();

connectDB()

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL];
const corsOption = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin, 'desde origin')) {
      // Puede consultar la API
      callback(null, true);
    } else {
      // No esta permitido
      callback(new Error("Error de Cors"));
    }
  },
};
app.use(cors()); // Delete corsOption parameter due to crashing app.

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/generations", generationRoutes);
app.use("/api/lineups", lineUpRoutes);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`)
});