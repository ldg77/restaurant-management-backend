import Table from "../models/Table.js";
import User from "../models/User.js";
export const getAll = async (req, res, next) => {
  try {
    res.status(200).send(await Table.find());
  } catch (error) {
    next({ message: error });
  }
};
export const getOne = async (req, res, next) => {
  try {
    res.status(200).send(await Table.findById(req.params.id));
  } catch (error) {
    next({ message: error });
  }
};
export const postOne = async (req, res, next) => {
  try {
    res
      .status(201)
      .send({ message: true, table: await Table.create(req.body) });
  } catch (error) {
    next({ message: error });
  }
};
export const updateOne = async (req, res, next) => {
  try {
    await User.updateMany(
      {},
      { $pull: { bookedTable: { $in: req.params.id } } }
    );

    if (req.body.bookedFrom && req.body.bookedTill) {
      await User.updateMany(
        {},
        { $pull: { bookedTable: { $in: req.params.id } } }
      );
      await User.findByIdAndUpdate(req.body.user, {
        $push: { bookedTable: req.params.id },
      });
      res.status(201).send(
        await Table.findByIdAndUpdate(req.params.id, {
          ...req.body,
          available: false,
        })
      );
    } else {
      res.status(201).send(
        await Table.findByIdAndUpdate(req.params.id, {
          bookedFrom: "",
          bookedTill: "",
          available: true,
        })
      );
    }
  } catch (error) {
    next({ message: error });
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
    next({ message: error });
  }
};
