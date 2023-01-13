import Product from "../models/Product.js";
import * as dotenv from "dotenv";
dotenv.config();
export const getAll = async (req, res, next) => {
  try {
    res.status(200).send(await Product.find({}, { __v: 0 }));
  } catch (error) {
    next({ message: error });
  }
};

export const getOne = async (req, res, next) => {
  try {
    res.status(200).send(await Product.findById(req.params.id));
  } catch (error) {
    next({ message: error });
  }
};
export const postOne = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).send(
      await Product.findByIdAndUpdate(product._id, {
        avatar: `${process.env.HOST}:${process.env.PORT}/${req.file.path}`,
      })
    );
  } catch (error) {
    next({ message: error });
  }
};
export const deleteOne = async (req, res, next) => {
  try {
    res.status(200).send(await Product.findByIdAndDelete(req.params.id));
  } catch (error) {
    next({ message: error });
  }
};
export const updateOne = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(product);
    res
      .status(201)
      .send(
        await Product.updateOne(
          { _id: product._id },
          {
            ...req.body,
            avatar: `${process.env.HOST}:${process.env.PORT}/${req.file.path}`,
          }
        )
      );
  } catch (error) {
    next({ message: error });
  }
};
