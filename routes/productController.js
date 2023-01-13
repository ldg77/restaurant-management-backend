import express from "express";
import {
  deleteOne,
  getAll,
  getOne,
  postOne,
  updateOne,
} from "../controller/productController.js";

const productRouter = express.Router();
productRouter.route("/").get(getAll).post(postOne);
productRouter.route("/:id").get(getOne).patch(updateOne).delete(deleteOne);

export default productRouter;
