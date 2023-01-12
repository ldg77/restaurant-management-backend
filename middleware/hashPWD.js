import bcrypt from "bcrypt";
export default async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;
    next();
  } catch (error) {
    next({ message: error });
  }
};
