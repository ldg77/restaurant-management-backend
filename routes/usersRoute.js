import express from "express";
import {
  checklogin,
  deleteOne,
  getAll,
  getOne,
  loginOne,
  logout,
  postOne,
  updateOne,
} from "../controller/userController.js";
import auth from "../middleware/auth.js";
import checkPWD from "../middleware/checkPWD.js";
import hashPWD from "../middleware/hashPWD.js";
import isAdmin from "../middleware/isAdmin.js";
import validateRequest from "../middleware/validateRequest.js";
import { registerUser } from "../validator/userValidator.js";

// set userRouter
const userRouter = express.Router();
// set routes in root
userRouter
  .route("/")
  .get(auth, isAdmin, getAll)
  .post(registerUser, validateRequest, hashPWD, postOne);
userRouter.route("/login").post(checkPWD, loginOne);
userRouter.route("/logout").post(auth, logout);
userRouter.route("/checklogin").get(checklogin);
// set routes on param
userRouter
  .route("/:id")
  .get(auth, getOne)
  .patch(auth, isAdmin, updateOne)
  .delete(auth, isAdmin, deleteOne);

export default userRouter;
