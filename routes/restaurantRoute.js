import express from "express";
import { getAll, postOne } from "../controller/restaurantController.js";

const restaurantRouter = express.Router();

restaurantRouter.route("/").get(getAll).post(postOne);

export default restaurantRouter;
