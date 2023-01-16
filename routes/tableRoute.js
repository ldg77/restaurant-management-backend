import express from "express";

import {
  deleteOne,
  getAll,
  getOne,
  postOne,
  updateOne,
} from "../controller/tableController.js";
const tableRouter = express.Router();
tableRouter.route("/").get(getAll).post(postOne);
tableRouter.route("/:id").get(getOne).patch(updateOne).delete(deleteOne);

export default tableRouter;
