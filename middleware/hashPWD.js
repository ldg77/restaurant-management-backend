import bcrypt from "bcrypt";
export default async (req, res, next) => {
  try {
    console.log(req.body.password === req.body.repeatPassword);
    if (req.body.password === req.body.repeatPassword) {
      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;
      next();
    } else {
      res
        .status(404)
        .send({ message: false, message: "password werification fail" });
    }
  } catch (error) {
    res.status(404).send({ message: false, message: "something wrong" });
  }
};
