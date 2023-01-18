import User from "../models/User.js";
import Group from "../models/Group.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
export const getAll = async (req, res, next) => {
  try {
    res
      .status(200)
      .send(
        await User.find({}, { password: 0, __v: 0 }).populate([
          "role",
          "bookedTable",
        ])
      );
  } catch (error) {
    res.status(404).send({ error: error });
  }
};

export const getOne = async (req, res, next) => {
  try {
    res.status(200).send(await User.findById(req.params.id));
  } catch (error) {
    res.status(404).send({ error: error });
  }
};
export const postOne = async (req, res, next) => {
  try {
    const role = await Group.findById(req.body.role);
    res.status(201).send({
      approved: true,
      data: await User.create({ ...req.body, isAdmin: role.name === "admin" }),
    });
  } catch (error) {
    res.status(404).send({ error: error });
  }
};
export const updateOne = async (req, res, next) => {
  try {
    const role = await Group.findById(req.body.role);
    res.status(201).send({
      approved: true,
      data: await User.findByIdAndUpdate(req.params.id, {
        ...req.body,
        isAdmin: role.name === "admin",
      }),
    });
  } catch (error) {
    res.status(404).send({ error: error });
  }
};
export const deleteOne = async (req, res, next) => {
  try {
    res.status(200).send(await User.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(404).send({ error: error });
  }
};
export const loginOne = async (req, res, next) => {
  try {
    if (req.body.approved) {
      res
        .status(200)
        .cookie("token", req.body.token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        })
        .send({ approved: req.body.approved });
    } else {
      res.status(404).send({ approved: false, message: "not approved" });
    }
  } catch (error) {
    res.status(404).send({ approved: false, error: error.message });
  }
};
export const checklogin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const tokenDecoded = jwt.verify(token, process.env.JWT);
    const loggedUser = await User.findById(tokenDecoded.id);
    res
      .status(200)
      .send({ aprooved: true, isAdmin: tokenDecoded.admin, user: loggedUser });
  } catch (error) {
    res.status(404).send({ error: error });
  }
};
export const logout = (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).send({ aprooved: false });
  } catch (error) {
    res.status(404).send({ error: error });
  }
};
