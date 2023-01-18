import express from "express";
import { getAll, postOne } from "../controller/restaurantController.js";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";

const restaurantRouter = express.Router();

restaurantRouter
  .route("/")
  .get(auth, isAdmin, getAll)
  .post(auth, isAdmin, postOne);

export default restaurantRouter;
