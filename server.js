import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/usersRoute.js";
import { errorMiddleware } from "./middleware/error.js";
import groupRouter from "./routes/groupRoute.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRoute.js";
import restaurantRouter from "./routes/restaurantRoute.js";
import tableRouter from "./routes/tableRoute.js";
const PORT = process.env.PORT || 4000;
const URI = process.env.URI || "mongodb://localhost:27017/test";
// initialize express
const app = express();

// set middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
// app.use(express.static("dist"));
app.use("/uploads", express.static("uploads"));

// set routes
app.use("/users", userRouter);
app.use("/groups", groupRouter);
app.use("/products", productRouter);
app.use("/restaurants", restaurantRouter);
app.use("/tables", tableRouter);

// set mongoose
app.use(errorMiddleware);
mongoose.connect(URI, () => {
  console.log("DB-Connected");
  (err) => {
    console.error(err);
  };
});

// set express on PORT
app.listen(PORT, () => {
  console.log("Server listen on PORT: " + PORT);
});
