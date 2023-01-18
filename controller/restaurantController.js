import Restaurant from "../models/Restaurant.js";
export const getAll = async (req, res, next) => {
  try {
    res.status(200).send(await Restaurant.find());
  } catch (error) {
    res.status(404).send({ error: error });
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
    } else {
      res.status(201).send(await Restaurant.create(req.body));
    }
  } catch (error) {
    res.status(404).send({ error: error });
  }
};
