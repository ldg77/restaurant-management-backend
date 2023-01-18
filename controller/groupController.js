import Group from "../models/Group.js";
import Table from "../models/Table.js";
import User from "../models/User.js";

export const getAll = async (req, res, next) => {
  try {
    res.status(200).send(await Group.find({}, { __v: 0 }));
  } catch (error) {
    res.status(404).send({ error: error });
  }
};

export const getOne = async (req, res, next) => {
  try {
    res.status(200).send(await Group.findById(req.params.id));
  } catch (error) {
    res.status(404).send({ error: error });
  }
};
export const postOne = async (req, res, next) => {
  try {
    res
      .status(201)
      .send({ approved: true, group: await Group.create(req.body) });
  } catch (error) {
    res.status(404).send({ error: error });
  }
};
export const deleteOne = async (req, res, next) => {
  try {
    await User.deleteMany({ role: req.params.id });

    res.status(200).send(await Group.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(404).send({ error: error });
  }
};
export const updateOne = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id);
    res
      .status(201)
      .send({
        approved: true,
        data: await Group.updateOne({ _id: group._id }, { ...req.body }),
      });
  } catch (error) {
    res.status(404).send({ error: error });
  }
};
