import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
export default async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const tokenDecoded = jwt.verify(token, process.env.JWT);
    if (tokenDecoded.id) {
      next();
    } else {
      res.status(404).send({ approved: false, message: "Error on Auth" });
    }
  } catch (error) {
    res.status(404).send({ approved: false, message: "Error on Auth" });
  }
};
