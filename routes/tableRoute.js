import express from "express";

import {
  clearOne,
  deleteOne,
  getAll,
  getOne,
  postOne,
  updateOne,
} from "../controller/tableController.js";
import checkDates from "../middleware/checkDates.js";
const tableRouter = express.Router();
tableRouter.route("/").get(getAll).post(postOne);
tableRouter.route("/clear/:id").patch(clearOne);
tableRouter
  .route("/:id")
  .get(getOne)
  .patch(checkDates, updateOne)
  .delete(deleteOne);

export default tableRouter;
