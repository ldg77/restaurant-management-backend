import Table from "../models/Table.js";
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
    console.log(req.body);
    if (req.body.bookedFrom.length && req.body.bookedTill.length) {
      res.status(201).send(
        await Table.updateOne(
          { _id: req.params.id },
          {
            bookedFrom: req.body.bookedFrom,
            bookedTill: req.body.bookedTill,
            available: false,
          }
        )
      );
    }

    res.status(201).send(
      await Table.updateOne(
        { _id: req.params.id },
        {
          bookedFrom: req.body.bookedFrom,
          bookedTill: req.body.bookedTill,
          available: true,
        }
      )
    );
  } catch (error) {
    next({ message: error });
  }
};
export const deleteOne = async (req, res, next) => {
  try {
    res.status(201).send(await Table.findByIdAndDelete(req.params.id));
  } catch (error) {
    next({ message: error });
  }
};
