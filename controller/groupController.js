import Group from "../models/Group.js";

export const getAll = async (req, res, next) => {
  try {
    res.status(200).send(await Group.find({}, { __v: 0 }));
  } catch (error) {
    next({ message: error });
  }
};

export const getOne = async (req, res, next) => {
  try {
    res.status(200).send(await Group.findById(req.params.id));
  } catch (error) {
    next({ message: error });
  }
};
export const postOne = async (req, res, next) => {
  try {
    res.status(201).send(await Group.create(req.body));
  } catch (error) {
    next({ message: error });
  }
};
