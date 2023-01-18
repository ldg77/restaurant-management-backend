import express from "express";

import {
  clearOne,
  deleteOne,
  getAll,
  getOne,
  postOne,
  updateOne,
} from "../controller/tableController.js";
import auth from "../middleware/auth.js";
import checkDates from "../middleware/checkDates.js";
import isAdmin from "../middleware/isAdmin.js";
const tableRouter = express.Router();
tableRouter.route("/").get(auth, getAll).post(auth, postOne);
tableRouter.route("/clear/:id").patch(auth, clearOne);
tableRouter
  .route("/:id")
  .get(auth, getOne)
  .patch(auth, checkDates, updateOne)
  .delete(auth, isAdmin, deleteOne);

export default tableRouter;
