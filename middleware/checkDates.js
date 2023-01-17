export default (req, res, next) => {
  try {
    if (new Date(req.body.bookedFrom) < new Date(req.body.bookedTill)) {
      next();
    } else {
      res
        .status(404)
        .send({ approved: false, message: "check please the dates" });
    }
  } catch (error) {
    next(error);
  }
};
