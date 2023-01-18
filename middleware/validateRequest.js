import { validationResult } from "express-validator";
export default (req, res, next) => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  } else {
    console.log(validationErrors.array());
    res
      .status(400)
      .send({ approved: false, message: validationErrors.array()[0].msg });
  }
};
