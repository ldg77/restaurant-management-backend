import mongoose from "mongoose";
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
    },
    bookedFrom: {
      type: Date,
    },
    bookedTill: {
      type: Date,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Table", tableSchema);
