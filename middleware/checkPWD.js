import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
export default async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const verify = await bcrypt.compare(req.body.password, user.password);
      if (verify) {
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
      }
      next({ message: "Wrong Password" });
    }
    next({ message: "Wrong Username" });
  } catch (error) {
    next(error);
  }
};
