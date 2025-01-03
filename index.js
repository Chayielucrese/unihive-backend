import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.routes.js";
import serviceCategoryRoutes from "./routes/category.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import userRoutes from "./routes/user.routes.js";
import http from "http";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = http.createServer(app);
const io = new Server(server, {
  maxHttpBufferSize: 1e8,
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
  },
});

const dbRemoteUrl = process.env.MONGODB_URI;
mongoose
  .connect(dbRemoteUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("db connection successful");
  })
  .catch((err) => {
    console.log("an error occures,", err);
  });

app.use("/api/auth", authRoutes);
app.use("/api/category", serviceCategoryRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/user", userRoutes);
app.listen("9000", console.log("server is listening on port 8082"));

export { io };
