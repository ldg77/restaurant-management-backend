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
import checkPWD from "../middleware/checkPWD.js";
import hashPWD from "../middleware/hashPWD.js";

// set userRouter
const userRouter = express.Router();
// set routes in root
userRouter.route("/").get(getAll).post(hashPWD, postOne);
userRouter.route("/login").post(checkPWD, loginOne);
userRouter.route("/logout").post(logout);
userRouter.route("/checklogin").get(checklogin);
// set routes on param
userRouter.route("/:id").get(getOne).patch(updateOne).delete(deleteOne);

export default userRouter;
