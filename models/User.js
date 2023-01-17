import mongoose from "mongoose";
import Table from "./Table.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    bookedTable: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema, "users");

User.watch().on("change", async (data) => {
  if (data.operationType === "delete") {
    await Table.updateMany(
      { user: data.documentKey._id },
      {
        bookedFrom: null,
        bookedTill: null,
        available: true,
        user: null,
      }
    );
  }
});

export default User;
