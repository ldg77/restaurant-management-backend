import mongoose from "mongoose";
import User from "./User.js";
const tableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    capacity: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    bookedFrom: {
      type: Date,
    },
    bookedTill: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Table = mongoose.model("Table", tableSchema);

export default Table;
