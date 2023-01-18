import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
export default async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) throw new Error("User not found");
    const verify = await bcrypt.compare(req.body.password, user.password);
    if (!verify) throw new Error("Wrong Password");
    req.body.approved = verify;
    const token = jwt.sign(
      { id: user._id, admin: user.isAdmin },
      process.env.JWT,
      {
        expiresIn: "1h",
      }
    );
    req.body.token = token;
    next();
  } catch (error) {
    res.status(404).send({ approved: false, message: "Wrong Password" });
  }
};
