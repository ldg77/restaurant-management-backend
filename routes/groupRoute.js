import express from "express";
import {
  deleteOne,
  getAll,
  getOne,
  postOne,
  updateOne,
} from "../controller/groupController.js";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";

const groupRouter = express.Router();
groupRouter.route("/").get(auth, isAdmin, getAll).post(auth, isAdmin, postOne);
groupRouter
  .route("/:id")
  .get(auth, isAdmin, getOne)
  .patch(auth, isAdmin, updateOne)
  .delete(auth, isAdmin, deleteOne);

export default groupRouter;
