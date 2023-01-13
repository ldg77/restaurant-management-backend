import express from "express";
import {
  deleteOne,
  getAll,
  getOne,
  postOne,
  updateOne,
} from "../controller/groupController.js";

const groupRouter = express.Router();
groupRouter.route("/").get(getAll).post(postOne);
groupRouter.route("/:id").get(getOne).patch(updateOne).delete(deleteOne);

export default groupRouter;
