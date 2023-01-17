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

const handleTables = async (id) => {
  try {
    const user = await User.findById(id);
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};

User.watch().on("change", (data) => {
  switch (data.operationType) {
    case "delete":
      handleTables(data.documentKey._id);
      break;

    default:
      break;
  }
});

export default User;
