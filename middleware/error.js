export const errorMiddleware = async (err, req, res, next) => {
  try {
    res.status(200).send({ error: err.message });
  } catch (error) {
    next({ message: error.message });
  }
};
