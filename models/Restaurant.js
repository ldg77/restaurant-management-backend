import mongoose from "mongoose";

const restaurantAddress = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  streetnumber: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});
const restaurantContact = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  fax: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  homepage: {
    type: String,
  },
});

const restaurant = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: restaurantAddress,
      required: true,
    },
    contact: {
      type: restaurantContact,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
