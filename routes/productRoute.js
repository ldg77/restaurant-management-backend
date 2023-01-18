import express from "express";
import multer from "multer";
import {
  deleteOne,
  getAll,
  getOne,
  postOne,
  updateOne,
} from "../controller/productController.js";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
const upload = multer({ dest: "uploads/" });

const productRouter = express.Router();
productRouter
  .route("/")
  .get(auth, isAdmin, getAll)
  .post(upload.single("avatar"), auth, isAdmin, postOne);
productRouter
  .route("/:id")
  .get(auth, isAdmin, getOne)
  .patch(upload.single("avatar"), auth, isAdmin, updateOne)
  .delete(auth, isAdmin, deleteOne);

export default productRouter;
