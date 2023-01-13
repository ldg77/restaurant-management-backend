import express from "express";
import multer from "multer";
import {
  deleteOne,
  getAll,
  getOne,
  postOne,
  updateOne,
} from "../controller/productController.js";
const upload = multer({ dest: "uploads/" });

const productRouter = express.Router();
productRouter.route("/").get(getAll).post(upload.single("avatar"), postOne);
productRouter
  .route("/:id")
  .get(getOne)
  .patch(upload.single("avatar"), updateOne)
  .delete(deleteOne);

export default productRouter;
