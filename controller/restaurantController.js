import Restaurant from "../models/Restaurant.js";
export const getAll = async (req, res, next) => {
  try {
    res.status(200).send(await Restaurant.find());
  } catch (error) {
    next({ message: error });
  }
};
export const postOne = async (req, res, next) => {
  try {
    if (req.body._id) {
      res.status(201).send(
        await Restaurant.findByIdAndUpdate(req.body._id, {
          name: req.body.name,
          address: req.body.address,
          contact: req.body.contact,
        })
      );
    }
    res.status(201).send(await Restaurant.create(req.body));
  } catch (error) {
    next({ message: error });
  }
};
