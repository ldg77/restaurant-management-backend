import User from "../models/User.js";
import Group from "../models/Group.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
export const getAll = async (req, res, next) => {
  try {
    res
      .status(200)
      .send(await User.find({}, { password: 0, __v: 0 }).populate("role"));
  } catch (error) {
    next({ message: error });
  }
};

export const getOne = async (req, res, next) => {
  try {
    res.status(200).send(await User.findById(req.params.id));
  } catch (error) {
    next({ message: error });
  }
};
export const postOne = async (req, res, next) => {
  try {
    const role = await Group.findById(req.body.role);
    if (role.name === "admin") {
      res.status(201).send(await User.create({ ...req.body, isAdmin: true }));
    }
    res.status(201).send(await User.create(req.body));
  } catch (error) {
    next({ message: error });
  }
};
export const updateOne = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res
      .status(201)
      .send(await User.updateOne({ _id: user._id }, { ...req.body }));
  } catch (error) {
    next({ message: error });
  }
};
export const deleteOne = async (req, res, next) => {
  try {
    res.status(200).send(await User.findByIdAndDelete(req.params.id));
  } catch (error) {
    next({ message: error });
  }
};
export const loginOne = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("loginCookie", req.body.token, {
        httpOnly: true,
      })
      .send({ message: req.body.approved });
  } catch (error) {
    next({ message: error.message });
  }
};
export const checklogin = (req, res, next) => {
  try {
    const token = req.cookies.loginCookie;
    const tokenDecoded = jwt.verify(token, process.env.JWT);
    res.status(200).send({ aprooved: true, isAdmin: tokenDecoded.admin });
  } catch (error) {
    res.status(401).end();
  }
};
