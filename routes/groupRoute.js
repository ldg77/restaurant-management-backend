import express from "express";
import { getAll, postOne } from "../controller/groupController.js";

const groupRouter = express.Router();
groupRouter.route("/").get(getAll).post(postOne);

export default groupRouter;
