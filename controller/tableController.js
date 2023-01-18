import Table from "../models/Table.js";
import User from "../models/User.js";
export const getAll = async (req, res, next) => {
  try {
    res.status(200).send(await Table.find().populate("user"));
  } catch (error) {
    res.status(404).send({ error: error });
  }
};
export const getOne = async (req, res, next) => {
  try {
    res.status(200).send(await Table.findById(req.params.id));
  } catch (error) {
    res.status(404).send({ error: error });
  }
};
export const postOne = async (req, res, next) => {
  try {
    res
      .status(201)
      .send({ approved: true, table: await Table.create(req.body) });
  } catch (error) {
    res.status(404).send({ message: "Table exist allready" });
  }
};
export const updateOne = async (req, res, next) => {
  try {
    await User.updateMany(
      {},
      { $pull: { bookedTable: { $in: req.params.id } } }
    );

    if (req.body.bookedFrom && req.body.bookedTill) {
      await User.findByIdAndUpdate(req.body.user, {
        $push: { bookedTable: req.params.id },
      });
      res.status(201).send({
        approved: true,
        data: await Table.findByIdAndUpdate(req.params.id, {
          ...req.body,
          available: false,
        }),
      });
    } else {
      res.status(201).send({
        approved: true,
        data: await Table.findByIdAndUpdate(req.params.id, {
          bookedFrom: "",
          bookedTill: "",
          available: true,
          user: null,
        }),
      });
    }
  } catch (error) {
    res.status(404).send({ error: error });
  }
};
export const deleteOne = async (req, res, next) => {
  try {
    await User.updateMany(
      {},
      { $pull: { bookedTable: { $in: req.params.id } } }
    );
    res.status(201).send(await Table.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(404).send({ error: error });
  }
};
export const clearOne = async (req, res, next) => {
  try {
    await User.updateMany(
      {},
      { $pull: { bookedTable: { $in: req.params.id } } }
    );
    res.status(201).send({
      approved: true,
      data: await Table.findByIdAndUpdate(req.params.id, {
        bookedFrom: "",
        bookedTill: "",
        available: true,
        user: null,
      }),
    });
  } catch (error) {
    res.status(404).send({ error: error });
  }
};
