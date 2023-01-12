import mongoose from "mongoose";

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

export default mongoose.model("User", userSchema, "users");
